const { Barber, Order } = require("../models/index");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
// const e = require("cors");

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
    if (!err.errors) {
      res.status(500).json(err);
    } else {
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
  }
};

const deleteBarber = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Barber.findOne({
      where: { id: id },
    });
    if (result) {
      await Order.destroy({
        where:{barberId:id}
      })
      await Barber.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "Barber success to delete" });
    } else {
      // res.status(404).json({ message: "Barber not found" });
      res.status(500).json(new Error('error'));
    }
  } catch (err) {
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
      throw new Error( 'invalid password');
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
    if(err.message === 'invalid password'){
      res.status(401).json(err.message)
    } else if (err.message === 'no result'){
      res.status(404).json(err.message)
    } else {
      res.status(500).json(err)

    }
    // if(!err.errors){
    //   res.status(500).json(err)
    // }else if (err === ) {
    //     res.status(401).json(err);
    // }
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
