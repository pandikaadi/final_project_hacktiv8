const express = require("express");
const indexRouter = express.Router();
const userRouter = require("./userRouter");
const barberRouter = require("./barberRouter");
const orderRouter = require("./orderRouter");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");
const orderForBarberRouter = require("./orderForBarberRouter");
const serviceRouter = require("./serviceRouter")

indexRouter.use("/register", registerRouter);
indexRouter.use("/login", loginRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/barbers", barberRouter);
indexRouter.use("/orders", orderRouter);
indexRouter.use("/ordersBarber", orderForBarberRouter)
indexRouter.use("/services", serviceRouter)

module.exports = indexRouter;
