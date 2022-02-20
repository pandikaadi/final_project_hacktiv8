const express = require("express");
const barberRouter = express.Router();
const barberController = require("../controllers/barberController");
const authentication = require("../middlewares/authentication");

barberRouter.get("/", barberController.getBarbers);
barberRouter.get("/:id", barberController.getBarberById);
barberRouter.post("/", barberController.postBarber);
barberRouter.post("/login", barberController.barberLogin);
barberRouter.delete("/:id", barberController.deleteBarber);
barberRouter.put("/:id", barberController.updateBarber);
barberRouter.patch("/location", authentication, barberController.updateLocation)
module.exports = barberRouter;
