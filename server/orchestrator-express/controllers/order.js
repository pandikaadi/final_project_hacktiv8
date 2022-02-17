const axios = require("axios");
const { verifyToken } = require("../helpers/jwt");

const getOrders = async (req, res) => {
  const token = req.headers.access_token;
  try {
    const { data: orders } = await axios({
      method: "GET",
      url: "http://localhost:4001/orders",
      headers: {
        access_token: token,
      },
    });
    if (orders) {
      const { data: user } = await axios({
        method: "GET",
        url: `http://localhost:4002/users/${id}`,
      });
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "orders not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const postOrder = async (req, res) => {
  const token = req.headers.access_token;
  const payload = verifyToken(token);
  const { barberId, date, hour, serviceId } = req.body;
  const lat = req.body.lat;
  const long = req.body.long;
  try {
    const { data: orders } = await axios({
      method: "POST",
      url: "http://localhost:4001/orders",
      data: req.body,
      headers: {
        access_token: token,
      },
    });
    if (orders) {
      const { data: location } = await axios({
        method: "PUT",
        url: `http://localhost:4002/users/location/${payload.id}`,
        data: {
          lat,
          long,
        },
        headers: {
          access_token: token,
        },
      });
      if (location) {
        const { data: user } = await axios({
          method: "GET",
          url: `http://localhost:4002/users/${payload.id}`,
        });
        if (user) {
          res.status(201).json({ orders, userMongo: user });
        }
      }
    } else {
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  const token = req.headers.access_token;
  const { id } = req.params;
  try {
    const { data: orders } = await axios({
      method: "DELETE",
      url: `http://localhost:4001/orders/${id}`,
      headers: {
        access_token: token,
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const translateCoordinate = async (req, res) => {
  const { lat, long } = req.body;

  try {
    const translated = await axios({
      method: "get",
      url: `https://nominatim.openstreetmap.org/reverse?lat=${+lat}&lon=${+long}&format=json`,
    });
    res.status(200).json(translated.data.display_name);
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = { getOrders, postOrder, deleteOrder };
