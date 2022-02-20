const { Order, Barber, Service, User } = require("../models/index");

const sendMailOrder = require("../helpers/nodemailerOrder");

const postOrder = async (req, res) => {
  console.log(`sadadas`);
  const userId = req.currentUser.id;
  const { barberId, date, hour, serviceId, city, price, address, lat, long } =
    req.body;

  try {
    const orderKey = `${barberId}-${userId}-${new Date()
      .toISOString()
      .slice(5, 9)}${new Date().toISOString().slice(13, 20)}`;
    //order key barberId - userId - tanggal
    const midtransClient = require("midtrans-client");
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-0f3s9hGBklmiZm7cVhZ9KBZO",
    });
    // console.log(req.body, `>>>>>>>`);
    let parameter = {
      transaction_details: {
        order_id: orderKey,
        gross_amount: price,
      },
      customer_details: {
        email: req.currentUser.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    // transaction token
    let transactionToken = transaction.token;
    const order = await Order.create({
      userMonggoId: req.currentUser.userMonggoId,
      barberId,
      address,
      date,
      hour,
      city,
      lat: +lat,
      long: +long,
      serviceId,
      orderKey,
      price,
      paymentUrl: transaction.redirect_url,
    });
    if (order) {
      const findOrder = await Order.findOne({
        where: { id: order.id },
        include: [{ model: Barber }, { model: Service }],
      });
      if (findOrder) {
        // sendMailOrder(
        //   findOrder.User.email,
        //   findOrder.User.username,
        //   findOrder.Barber.name,
        //   findOrder.Service.name
        // );
        res.status(201).json({ findOrder });
      }
    }
  } catch (err) {
    console.log(err);
    if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "bad request" });
    } else if (err.errors) {
      err.errors.map((el) => {
        if (el.message === "date is required") {
          res.status(400).json(el);
        } else if (el.message === "hour is required") {
          res.status(400).json(el);
        } else if (el.message === "date cant be null") {
          res.status(400).json(el);
        } else if (el.message === "hour cant be null") {
          res.status(400).json(el);
        } else {
        }
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getOrdersByUserId = async (req, res) => {
  // get all orders by user id
  const { userMonggoId } = req.currentUser;
  try {
    const orders = await Order.findAll({
      order: ['id'],
      where: { userMonggoId },
      include: [{ model: Barber }, { model: Service }],
    });
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
};
const getDailyOrders = async (req, res) => {
  // get all orders by user id
  const { userMonggoId } = req.currentUser;
  const { date, barberId } = req.query
  try {
    const orders = await Order.findAll({
      where: { date, barberId },
      include: [{ model: Barber }, { model: Service }],
    });
    if (orders) {
      console.log(orders);
      res.status(200).json(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getBarbers = async (req, res) => {
  // get all orders by user id
  console.log(">>>>>>");
  const { userMonggoId } = req.currentUser;
  try {
    const barbers = await Barber.findAll();
    if (barbers) {
      res.status(200).json(barbers);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getOrdersByBarberId = async (req, res) => {
  // get all orders by barber id
  const { id } = req.currentBarber;

  try {
    const orders = await Order.findAll({
      where: { barberId: id },
      include: [{ model: Barber }, { model: Service }],
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
      include: [{ model: Barber }, { model: Service }],
    });
    if (order) {
      res.status(200).json(order);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id: id },
    });
    if (order) {
      await Order.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "Order success to delete" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { statusBarber } = req.body;
  try {
    const findOrder = await Order.findOne({ where: { id: id } });
    if (findOrder) {
      const result = await Order.update(
        {
          statusBarber: statusBarber,
        },
        {
          where: { id: id },
          returning: true,
        }
      );
      res.status(200).json(result[1][0]);
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const paymentHandler = async (req, res) => {
  try {
    if (
      req.body.transaction_status == "settlement" ||
      req.body.transaction_status == "capture"
    ) {
      const updatedPayment = await Order.update(
        {
          statusPayment: true,
          statusBarber: "Paid",
        },
        {
          where: {
            orderKey: req.body.order_id,
          },
        }
      );
    }
    res.status(200).json("ok");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  postOrder,
  getOrdersByUserId,
  getOrderByid,
  deleteOrder,
  getOrdersByBarberId,
  updateStatus,
  paymentHandler,
  getDailyOrders
};
