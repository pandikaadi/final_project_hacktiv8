const userRouter = require("express").Router();
const userController = require("../controllers/user");

userRouter.get("/", userController.findUsers);
userRouter.post("/", userController.postUser);
userRouter.post("/login", userController.postLogin);
userRouter.get("/:id", userController.findUserById);
userRouter.delete("/:id", userController.deleteUser);
module.exports = userRouter;
