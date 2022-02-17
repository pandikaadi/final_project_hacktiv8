const express = require("express");
const barberRouter = express.Router();
const barberController = require("../controllers/barberController");

barberRouter.get("/", barberController.getBarbers);
barberRouter.get("/:id", barberController.getBarberById);
barberRouter.post("/", barberController.postBarber);
barberRouter.post("/login", barberController.barberLogin);
barberRouter.delete("/:id", barberController.deleteBarber);
barberRouter.put("/:id", barberController.updateBarber);
module.exports = barberRouter;
