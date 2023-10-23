const dataService = require("./dataService");

const router = require("express").Router();

// ==================================================
// Routes
// ==================================================

router.get("/", (req, res) => {
  res.status(200).json({ message: "API home page" });
});

router.get("/counter/:counter/callNextClient", (req, res) => {
  const counter = dataService.data.counters.find(c => c.id === Number(req.params.counter));
  if(!counter) {
      return res.status(404).json({message: `Counter ${req.params.counter} not found`});
  }
  if(counter.clients.length === 0) {
      return res.status(204).json();
  }
  counter.servedClient = counter.clients.shift(); // Shift remove first array and remove it from array
  res.status(200).json({ data: counter.servedClient });
});

router.get("/service/:service/getTicket", (req, res) => {
  const counters = dataService.data.counters.filter(c => c.services.includes(Number(req.params.service)));
  const counterWithLeastClients = counters.reduce((acc, val) => {
    if(acc.clients.length > val.clients.length) {
      return val;
    }
    return acc;
  }, counters[0]);
  if(!counterWithLeastClients) {
    return res.status(404).json({message: `No counter was found with the service id ${req.params.service}`});
  }
  dataService.data.currentTicketNumber++;
  counterWithLeastClients.clients.push(dataService.data.currentTicketNumber);
  res.status(200).json({ data: dataService.data.currentTicketNumber });
});

// ==================================================
// Handle 404 not found - DO NOT ADD ENDPOINTS AFTER THIS
// ==================================================
router.use(function (req, res) {
  res
    .status(404)
    .json({
      message:
        "Endpoint not found, make sure you used the correct URL / Method",
    });
});

module.exports = router;
