const dataService = require("./dataService");

const router = require("express").Router();

// ==================================================
// Routes
// ==================================================

router.get("/", (req, res) => {
  res.status(200).json({ message: "API home page" });
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
