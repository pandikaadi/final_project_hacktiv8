const userRouter = require("express").Router();
const userController = require("../controllers/user");

userRouter.get("/", userController.findUsers);
userRouter.post("/", userController.postUser);
userRouter.get("/:id", userController.findUserById);
userRouter.post("/login", userController.postLogin);
userRouter.put("/:id", userController.updateUser);
userRouter.put("/location/:id", userController.updateLocation);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
