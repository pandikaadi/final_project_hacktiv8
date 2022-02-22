const axios = require("axios");

const getBarbers = async (req, res) => {
  try {
    const { data: barbers } = await axios({
      method: "GET",
      url: "http://localhost:4001/barbers",
    });
    if (barbers) {
      res.status(200).json(barbers);
    } else {
      res.status(404).json({ message: "barbers not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBarberById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: barber } = await axios({
      method: "GET",
      url: `http://localhost:4001/barbers/${id}`,
    });
    if (barber) {
      res.status(200).json(barber);
    } else {
      res.status(404).json({ message: "barber not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const postBarber = async (req, res) => {
  const { name, email, password, phoneNumber, city } = req.body;
  try {
    const { data: barber } = await axios({
      method: "POST",
      url: "http://localhost:4001/barbers",
      data: req.body,
    });
    if (barber) {
      res.status(201).json(barber);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginBarber = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: token } = await axios({
      method: "POST",
      url: "http://localhost:4001/barbers/login",
      data: req.body,
    });
    if (token) {
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateLocationBarber = async (req, res) => {
  try {
    const { data: message } = await axios({
      headers: { access_token: req.headers.access_token },
      method: "PATCH",
      url: "http://localhost:4001/barbers/location",
      data: req.body,
    });
    if (message) {
      res.status(200).json(req.body);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteBarber = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: barber } = await axios({
      method: "DELETE",
      url: `http://localhost:4001/barbers/${id}`,
    });
    res.status(200).json(barber);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getBarbers,
  getBarberById,
  postBarber,
  loginBarber,
  updateLocationBarber,
  deleteBarber,
};
