"use strict";
const express = require("express");
const cors = require("cors");

const app = new express();

// --- Console requests
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  console.log(
    `[${new Date().toLocaleTimeString("it-IT")}] - ${req.method} ${req.url}`
  );
  next();
});
app.use(express.json());

app.use(require("./routes.js"));

module.exports = app;
