const express = require("express");
const indexRouter = express.Router();
const userRouter = require("./userRouter");
const barberRouter = require("./barberRouter");
const orderRouter = require("./orderRouter");
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");

indexRouter.use("/register", registerRouter);
indexRouter.use("/login", loginRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/barbers", barberRouter);
indexRouter.use("/orders", orderRouter);

module.exports = indexRouter;
