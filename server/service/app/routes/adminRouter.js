const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const authentication = require("../middlewares/authentication");

adminRouter.use(authentication);

adminRouter.get("/all", adminController.getAll);

module.exports = adminRouter