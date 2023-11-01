"use strict";
const dataService = require("./dataService");

const router = require("express").Router();

// ==================================================
// Routes
// ==================================================

router.get("/", (req, res) => {
  res.status(200).json({ message: "API home page" });
});

// ==================================================
// Counter Routes
// ==================================================

// Return all the counters
router.get("/counter/retCounters", (req, res) => {
  const ret = dataService.data.counters;
  if (ret.length === 0) {
    return res.status(404).json({ message: `No counters is found` });
  }
  res.status(200).json({ data: ret });
});

// Update a counter given its counterId
router.put("/counters/:counterId", (req, res) => {
  if (!Number.isInteger(parseInt(req.params.counterId))) {
    return res.status(403).send("Invalid counter name");
  }
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id
  );
  if (counter_targeted === undefined) {
    return res
      .status(403)
      .send("The counter you want to modify does not exist");
  }

  if (counter_targeted.clients.length !== 0) {
    return res
      .status(403)
      .send(
        "You cannot modify the counter, because it has clients in its queue!"
      );
  }

  let service_not_existent = false;
  if (req.body.services) {
    // check if every service id in the body is legal
    for (let service of req.body.services) {
      if (
        !Number.isInteger(service) ||
        !dataService.data.services.some(
          (service_in_json) => service_in_json.id === service
        )
      ) {
        service_not_existent = true;
        break;
      }
    }
  } else {
    return res.status(403).send("Missing services array");
  }
  if (service_not_existent) {
    return res
      .status(403)
      .send("Some of the services you want to add do not exist");
  }
  counter_targeted.services = req.body.services;
  return res.json(counter_targeted);
});

// Remove a service from a counter that already hasn't it does not give an error
router.delete("/counters/:counterId/services/:serviceId", (req, res) => {
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id
  );
  if (counter_targeted === undefined) {
    return res
      .status(403)
      .send("The counter you want to modify does not exist");
  }
  if (
    !dataService.data.services.some(
      (service) => service.id === parseInt(req.params.serviceId)
    )
  ) {
    return res
      .status(403)
      .send("The service you want to remove does not exist");
  }
  counter_targeted.services = counter_targeted.services.filter(
    (service) => service.id !== parseInt(req.params.serviceId)
  );
  return res.json({});
});

// Get the currently served client for a counter given the counterId
router.get("/counters/:counterId/served-client", (req, res) => {
  const counter_targeted = dataService.data.counters.find(
    (counter) => parseInt(req.params.counterId) === counter.id
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

// Get the next client to be served for a counter given the counterId
router.get("/counter/:counterId/callNextClient", (req, res) => {
  const counter = dataService.data.counters.find(
    (c) => c.id === Number(req.params.counterId)
  );
  if (!counter) {
    return res
      .status(404)
      .json({ message: `Counter ${req.params.counterId} not found` });
  }
  if (counter.clients.length === 0) {
    return res.status(204).json();
  }
  counter.servedClient = counter.clients.shift(); // Shift remove first array and remove it from array
  res.status(200).json({ data: counter.servedClient });
});

// Get the counters joined with the services data
router.get("/counter/getData", (req, res) => {
  const data = dataService.data;

  if (data === undefined || data.length === 0) {
    return res.status(404).json({ message: `No data is found` });
  }
  const services = data.services;
  const counters = data.counters.map((counter) => {
    return {
      id: counter.id,
      services: counter.services.map((serviceId) =>
        services.find((service) => service.id === serviceId)
      ),
    };
  });
  res.status(200).json({ data: counters });
});

// ==================================================
// Services Routes
// ==================================================

// Get all the services
router.get("/service", (req, res) => {
  const services = dataService.data.services;
  if (services.length === 0) {
    return res.status(204).json();
  }
  res.status(200).json({ data: services });
});

// Get a ticket for a service given the serviceId
router.get("/service/:serviceId/getTicket", (req, res) => {
  const counters = dataService.data.counters.filter((c) =>
    c.services.includes(Number(req.params.serviceId))
  );
  const counterWithLeastClients = counters.reduce((acc, val) => {
    if (acc.clients.length > val.clients.length) {
      return val;
    }
    return acc;
  }, counters[0]);
  if (!counterWithLeastClients) {
    return res.status(404).json({
      message: `No counter was found with the service id ${req.params.serviceId}`,
    });
  }
  dataService.data.currentTicketNumber++;
  counterWithLeastClients.clients.push(dataService.data.currentTicketNumber);
  res.status(200).json({ data: dataService.data.currentTicketNumber });
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
