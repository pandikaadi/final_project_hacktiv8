const express = require("express");
const orderForBarberRouter = express.Router();
const orderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

orderForBarberRouter.use(authentication);
orderForBarberRouter.get("/", orderController.getOrdersByBarberId);
orderForBarberRouter.patch("/:id", orderController.updateStatus);

module.exports = orderForBarberRouter;
