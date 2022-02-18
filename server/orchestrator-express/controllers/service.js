const axios = require("axios");

const getServices = async (req, res) => {
  try {
    const { data: barbers } = await axios({
      method: "GET",
      url: "http://localhost:4001/services",
    });
    if (barbers) {
      res.status(200).json(barbers);
    } else {
      res.status(404).json({ message: "service not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: service } = await axios({
      method: "GET",
      url: `http://localhost:4001/services/${id}`,
    });
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "barber not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const postService = async (req, res) => {
  const { name, price } = req.body;
  try {
    const { data: service } = await axios({
      method: "POST",
      url: "http://localhost:4001/services",
      data: req.body,
    });
    if (service) {
      res.status(201).json(service);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: service } = await axios({
      method: "DELETE",
      url: `http://localhost:4001/services/${id}`,
    });
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "service not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getServices, getServiceById, postService, deleteService };
