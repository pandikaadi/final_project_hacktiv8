const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;
const userController = require("./controllers/user");
const orderController = require("./controllers/order");
const adminController = require("./controllers/admin");
const barberController = require("./controllers/barber");
const coordinateController = require("./controllers/coordinate");
const serviceController = require("./controllers/service");
const voteController = require("./controllers/vote");
const voteRouter = require("../service/app/routes/voteRouter");
const { paymentHandler } = require("../service/app/controllers/orderController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.postUser);
app.post("/login", userController.loginUser);
app.put("/users/:id", userController.updateUser);

app.get("/orders", orderController.getOrders);
app.get("/dailyOrders", orderController.getOrdersByDate);
app.get("/orders/:id", orderController.getOrderById);
app.post("/orders", orderController.postOrder);
app.delete("/orders/:id", orderController.deleteOrder);

app.get("/ordersBarber", orderController.getOrdersByBarber);
app.patch("/ordersBarber/:id", orderController.updateStatusBarber);

app.get("/barbers", barberController.getBarbers);
app.get("/barbers/:id", barberController.getBarberById);
app.post("/barbers", barberController.postBarber);
app.patch("/barbers/location", barberController.updateLocationBarber);
app.post("/barbers/login", barberController.loginBarber);
app.delete("/barbers/:id", barberController.deleteBarber);

app.get("/services", serviceController.getServices);
app.get("/services/:id", serviceController.getServiceById);
app.post("/services", serviceController.postService);
app.post("/paymentHandler", paymentHandler);
app.delete("/services/:id", serviceController.deleteService);

app.post("/coordinates", coordinateController.translateCoordinate);

app.get("/votes/:barberId", voteController.getVotes);
app.post("/votes", voteController.postVote);

app.get("/admin/all", adminController.getAll);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// module.exports = app;
