const { Barber } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");
const axios = require("axios");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    if (process.env.NODE_ENV === "test" && payload) {
      req.currentUser = {
        id: payload.id,
        userMonggoId: payload.userMonggoId || null,
        role: payload.role,
        username: payload.username,
        email: payload.email,
      };
      next();
    } else {
      if (payload.role === "Customer") {
        const user = await axios({
          method: "GET",
          url: `http://localhost:4002/users/${payload.id}`,
        });
        req.currentUser = {
          id: user.data.id,
          userMonggoId: payload.userMonggoId || null,
          role: user.data.role,
          username: user.data.username,
          email: user.data.email,
        };
        if (access_token) {
          next();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } else if (payload.role === "Barber") {
        const barber = await Barber.findByPk(payload.id);
        req.currentBarber = {
          id: barber.id,
          role: barber.role,
          name: barber.name,
          email: barber.email,
        };

        if (access_token && barber) {
          next();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } else if (payload.role === "Admin") {
        const user = await axios({
          method: "GET",
          url: `http://localhost:4002/users/${payload.id}`,
        });
        req.currentUser = {
          id: user.data.id,
          userMonggoId: payload.userMonggoId || null,
          role: user.data.role,
          username: user.data.username,
          email: user.data.email,
        };
        next();
      }
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};

module.exports = authentication;
