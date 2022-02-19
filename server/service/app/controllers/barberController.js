const { Barber, BarberLocation } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.findAll();
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getBarberById = async (req, res) => {
  const { id } = req.params;
  try {
    const barber = await Barber.findOne({
      where: { id: id },
    });
    res.status(200).json(barber);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postBarber = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const barber = await Barber.create({ name, email, password, phoneNumber });
    if (barber) {
      res.status(201).json(barber);
    }
  } catch (err) {
    err.errors.map((el) => {
      if (el.message === "Name is required") {
        res.status(400).json(el);
      } else if (el.message === "Email is required") {
        res.status(400).json(el);
      } else if (el.message === "Password is required") {
        res.status(400).json(el);
      } else if (el.message === "Phone Number is required") {
        res.status(400).json(el);
      }
    });
  }
};

const deleteBarber = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Barber.findOne({
      where: { id: id },
    });
    if (result) {
      await Barber.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "Barber success to delete" });
    } else {
      res.status(404).json({ message: "Barber not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const updateBarber = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const { id } = req.params;
  try {
    const findBarber = await Barber.findOne({
      where: { id: id },
    });
    if (findBarber) {
      const updatedBarber = await Barber.update(
        {
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        },
        {
          where: { id: id },
          returning: true,
        }
      );
      res.status(200).json({ result: updatedBarber[1][0] });
    } else {
      res.status(404).json({ message: "Barber not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const barberLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Barber.findOne({
      where: {
        email: email,
      },
    });

    if (!result) {
      throw { message: "Invalid email/password" };
    } else {
    }
    if (!compareHash(password, result.password)) {
      throw { message: "Invalid email/password" };
    }

    const payload = {
      id: result.id,
      name: result.name,
      role: result.role,
    };

    const token = createToken(payload);
    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    if (err.message === "Invalid email/password") {
      res.status(401).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};
module.exports = {
  getBarbers,
  postBarber,
  getBarberById,
  deleteBarber,
  updateBarber,
  barberLogin,
};
