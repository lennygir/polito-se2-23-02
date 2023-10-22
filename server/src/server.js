"use strict";
const express = require("express");

const app = new express();

// --- Console requests
app.use(function (req, res, next) {
  console.log(
    `[${new Date().toLocaleTimeString("it-IT")}] - ${req.method} ${req.url}`
  );
  next();
});

app.use(require("./routes.js"));

module.exports = app;
