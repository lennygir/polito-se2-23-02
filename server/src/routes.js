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

//endpoint for returning all the counters
router.get("/counter/retCounters", (req, res) => {
  console.log("1")
  const ret = dataService.data.counters;
  if(ret.length === 0) {
      return res.status(404).json({message: `No counters is found`});
  }
  
  res.status(200).json({ data: ret });
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
