const express = require("express");
const users = require("./users");
const payment = require("./payment");

const routes = express.Router();

routes.use("/api", users);
routes.use("/api", payment);

module.exports = routes;
