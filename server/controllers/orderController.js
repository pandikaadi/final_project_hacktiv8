const { Order, Barber, Service, User } = require("../models/index");

const sendMailOrder = require("../helpers/nodemailerOrder");

const postOrder = async (req, res) => {
  const userId = req.currentUser.id;
  const { barberId, date, hour, serviceId } = req.body;

  try {
    const order = await Order.create({
      userId,
      barberId,
      date,
      hour,
      serviceId,
    });
    if (order) {
      // console.log(order);
      const findOrder = await Order.findOne({
        where: { id: order.id },
        include: [{ model: User }, { model: Barber }, { model: Service }],
      });
      if (findOrder) {
        sendMailOrder(
          findOrder.User.email,
          findOrder.User.username,
          findOrder.Barber.name,
          findOrder.Service.name
        );
        res.status(201).json(findOrder);
      }
    } else {
    }
  } catch (err) {
    console.log(err);
    if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "bad request" });
    } else {
      err.errors.map((el) => {
        if (el.message === "date is required") {
          res.status(400).json(el);
        } else if (el.message === "hour is required") {
          res.status(400).json(el);
        } else {
          // res.status(500).json(err);
        }
      });
    }
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User }, { model: Barber }, { model: Service }],
    });
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrderByid = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id: id },
      include: [{ model: User }, { model: Barber }, { model: Service }],
    });
    if (order) {
      res.status(200).json(order);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { postOrder, getOrders, getOrderByid };
