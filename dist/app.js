"use strict";
const express = require("express");
const path = require("path");
const app = express();
// Serve static files
app.use(express.static(path.join(__dirname, "../public")));
// Define routes
const router = require("./routes");
app.use("/", router);
module.exports = app;
