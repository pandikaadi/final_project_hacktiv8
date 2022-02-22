const { Barber, Order, Vote, Service } = require("../models/index");

const getAll = async (req, res) => {
  try {
    const barbers = await Barber.findAll({ include: [Order, Vote] });
    const orders = await Order.findAll({ include: [Barber, Service] });
    const votes = await Vote.findAll({ include: [Barber] });
    const services = await Service.findAll();
    res.status(200).json({ barbers, orders, votes, services });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAll,
};
