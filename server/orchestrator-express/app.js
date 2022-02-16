const cors = require("cors");
const express = require("express");
const app = express();
const port = 4000;
const userController = require('./controllers/user');
const orderController = require('./controllers/order')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/users', userController.getUsers)
app.get('/users/:id', userController.getUserById)
app.post('/users', userController.postUser)
app.post('/login', userController.loginUser)
app.get('/orders', orderController.getOrders)
app.post('/orders', orderController.postOrder)
app.delete('/orders/:id', orderController.deleteOrder)



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;