const express = require("express");
const Verify = require("../schema/validate");
const verify = require("../middlewares/verifyToken");
const payment = require("../schema/payment");
const paymentController = require("../controller/paymentController");

const routes = express.Router();

routes.use(verify);

routes.post("/payment", Verify(payment.store), paymentController.store);
routes.get("/payment", paymentController.index);
routes.put("/payment/:id", Verify(payment.update), paymentController.update);
routes.delete("/payment/:id", Verify(payment.delete), paymentController.delete);

module.exports = routes;
