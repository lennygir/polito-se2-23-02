"use strict";
const dataService = require("./dataService");

const router = require("express").Router();

// ==================================================
// Routes
// ==================================================

router.get("/", (req, res) => {
  res.status(200).json({ message: "API home page" });
});

/**
 * add a service to a counter
 *
 * body:
 * {
 *  [
 *    "service1",
 *    "service2",
 *  ]: id of the service
 * }
 *
 * response:
 * {
 *  "id": id of the counter,
 *  "services": [ ids of the services of the counter after modifications ],
 *  "clients": [ clients associated with the counter ],
 *  "servedClient": null
 * }
 */
router.put("/counters/:counterId", (req, res) => {
  // todo: missing type validation
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id,
  );
  if (counter_targeted === undefined) {
    return res
      .status(403)
      .send("The counter you want to modify does not exist");
  }
  let service_not_existent = false;
  if (req.body.services) {
    for (let service of req.body.services) {
      if (
        !dataService.data.services.some(
          (service_in_json) => service_in_json.id === service,
        )
      ) {
        service_not_existent = true;
        break;
      }
      if (!counter_targeted.services.includes(service)) {
        counter_targeted.services.push(service);
      }
    }
  } else {
    return res
      .status(403)
      .send("Some of the services you want to add do not exist");
  }
  if (service_not_existent) {
    return res
      .status(403)
      .send("Some of the services you want to add do not exist");
  }
  return res.json(counter_targeted);
});

// removing a service from a counter that already hasn't it does not give an error
router.delete("/counters/:counterId/services/:serviceId", (req, res) => {
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id,
  );
  if (counter_targeted === undefined) {
    return res
      .status(403)
      .send("The counter you want to modify does not exist");
  }
  if (
    !dataService.data.services.some(
      (service) => service.id === parseInt(req.params.serviceId),
    )
  ) {
    return res
      .status(403)
      .send("The service you want to remove does not exist");
  }
  counter_targeted.services = counter_targeted.services.filter(
    (service) => service.id !== parseInt(req.params.serviceId),
  );
  return res.json({});
});

router.get("/counters/:counterId/served-client", (req, res) => {
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id,
  );
  if (counter_targeted === undefined) {
    return res.status(403).send("The counter you want to see does not exist");
  }
  if (!counter_targeted.servedClient) {
    return res
      .status(403)
      .send("There is not a client currently served for this counter");
  }
  return res.json(counter_targeted.servedClient);
});

router.get("/service", (req, res) => {
  const services = dataService.data.services;
  if (services.length === 0) {
    return res.status(204).json();
  }
  res.status(200).json({ data: services });
});

router.get("/counter/:counter/callNextClient", (req, res) => {
  const counter = dataService.data.counters.find(
    (c) => c.id === Number(req.params.counter),
  );
  if (!counter) {
    return res
      .status(404)
      .json({ message: `Counter ${req.params.counter} not found` });
  }
  if (counter.clients.length === 0) {
    return res.status(204).json();
  }
  counter.servedClient = counter.clients.shift(); // Shift remove first array and remove it from array
  res.status(200).json({ data: counter.servedClient });
});

//endpoint for returning all the counters
router.get("/counter/retCounters", (req, res) => {
  const ret = dataService.data.counters;
  if (ret.length === 0) {
    return res.status(404).json({ message: `No counters is found` });
  }

  res.status(200).json({ data: ret });
});

router.get("/service/:service/getTicket", (req, res) => {
  const counters = dataService.data.counters.filter((c) =>
    c.services.includes(Number(req.params.service)),
  );
  const counterWithLeastClients = counters.reduce((acc, val) => {
    if (acc.clients.length > val.clients.length) {
      return val;
    }
    return acc;
  }, counters[0]);
  if (!counterWithLeastClients) {
    return res.status(404).json({
      message: `No counter was found with the service id ${req.params.service}`,
    });
  }
  dataService.data.currentTicketNumber++;
  counterWithLeastClients.clients.push(dataService.data.currentTicketNumber);
  res.status(200).json({ data: dataService.data.currentTicketNumber });
});


//endpoint for returning all the counters
router.get("/counter/retCounters", (req, res) => {
  console.log("1")
  const ret = dataService.data.counters;
  if(ret.length === 0) {
      return res.status(404).json({message: `No counters is found`});
  }
  
  res.status(200).json({ data: ret });
});

router.get("/counter/getData", (req, res) => {
  
  const data = dataService.data;
  if(data === undefined) {
    return res.status(404).json({message: `No data is found`});
  }
  const counters = data.counters.map(counter => {
    const services = data.services
      .filter(service => counter.services.includes(service.id))
      .map(service => ({ id: service.id, name: service.name }));
  
    return { id: counter.id, services };
  });
  //console.log(JSON.stringify(counters, null, 2));

  res.status(200).json({ data: data });
});

// ==================================================
// Handle 404 not found - DO NOT ADD ENDPOINTS AFTER THIS
// ==================================================
router.use(function (req, res) {
  res.status(404).json({
    message: "Endpoint not found, make sure you used the correct URL / Method",
  });
});

module.exports = router;
