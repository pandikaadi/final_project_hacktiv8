const express = require("express");
const serviceRouter = express.Router();
const serviceController = require('../controllers/serviceController');

serviceRouter.get("/", serviceController.getServices)
serviceRouter.get("/:id", serviceController.getServiceById)
serviceRouter.post("/",serviceController.postService)
serviceRouter.put("/:id",serviceController.updateService)
serviceRouter.delete("/:id", serviceController.deleteService)

module.exports = serviceRouter;

