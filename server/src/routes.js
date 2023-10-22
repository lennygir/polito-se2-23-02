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
 *  "service": id of the service
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
router.put('/counters/:counterId', (req, res) => {
    // todo: missing type validation
    const counter_targeted = dataService.data.counters.find(counter => parseInt(req.params.counterId) === counter.id);
    if (counter_targeted === undefined) {
        return res.status(403).send("The counter you want to modify does not exist");
    }
    if (!dataService.data.services.some(service => service.id === req.body.service)) {
        return res.status(403).send("The service you want to add does not exist");
    }
    if (!counter_targeted.services.includes(req.body.service)) {
        counter_targeted.services.push(req.body.service);
    }
    return res.json(counter_targeted);
})

// removing a service from a counter that already hasn't it does not give an error
router.delete('/counters/:counterId/services/:serviceId', (req, res) => {
    const counter_targeted = dataService.data.counters.find(counter => parseInt(req.params.counterId) === counter.id);
    if (counter_targeted === undefined) {
        return res.status(403).send("The counter you want to modify does not exist");
    }
    if (!dataService.data.services.some(service => service.id === parseInt(req.params.serviceId))) {
        return res.status(403).send("The service you want to remove does not exist");
    }
    counter_targeted.services = counter_targeted.services.filter(service => service.id !== parseInt(req.params.serviceId));
    return res.json({});
})

// ==================================================
// Handle 404 not found - DO NOT ADD ENDPOINTS AFTER THIS
// ==================================================
router.use(function (req, res) {
    res.status(404).json({ message: "Endpoint not found, make sure you used the correct URL / Method" });
});

module.exports = router;