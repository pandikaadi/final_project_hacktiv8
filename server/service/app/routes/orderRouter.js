const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const authentication = require("../middlewares/authentication");

orderRouter.use(authentication);
orderRouter.get("/", orderController.getOrdersByUserId);
orderRouter.get("/:id", orderController.getOrderByid);
orderRouter.post("/", orderController.postOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

module.exports = orderRouter;
