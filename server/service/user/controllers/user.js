const User = require("../models/user");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const findUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Not Found!");
    }
    res.status(200).json(user);
  } catch (err) {
    if (err.message === "Not Found!") {
      res.status(404).json("User not found!");
    } else {
      res.status(500).json(err.message);
    }
  }
};

const postUser = async (req, res) => {
  const { username, email, password, phoneNumber, isAdmin } = req.body;

  try {
    const users = await User.find();
    const totalId = users.length;
    const role = isAdmin ? "Admin" : "Customer";
    const createdUser = await User.create({
      id: totalId + 1,
      username,
      email,
      password,
      phoneNumber,
      role: role,
    });
    res.status(201).json(createdUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      res.status(400).json({ errors: errors });
    } else {
      res.status(500).json(err.message);
    }
  }
};

const updateUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  const { id } = req.params;

  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      throw new Error("Not Found!");
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      returnOriginal: false,
      runValidators: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.message === "Not Found!") {
      res.status(404).json("User not found!");
    } else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      res.status(400).json({ errors: errors });
    } else {
      res.status(500).json(err.message);
    }
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndRemove(id, {
      returnOriginal: true,
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      throw new Error("InvalidEmail");
    }
    if (!compareHash(password, foundUser.password)) {
      throw new Error("InvalidPassword");
    }
    const payload = {
      id: foundUser.id,
      userMonggoId: foundUser.id,
      username: foundUser.username,
      role: foundUser.role,
    };
    const token = createToken(payload);
    res.status(200).json({
      access_token: token,
      role: foundUser.role
    });
  } catch (err) {
    if (err.message === 'InvalidEmail' || err.message === 'InvalidPassword') {
      res.status(401).json({ message: "Invalid email/password" });
    } else {
      res.status(500).json(err.message);
    }
  }
};
  

// const updateLocation = (req,res) => {

//   const { lat, long } = req.body;
//   const { id } = req.params
//   try{
//     User.updateLoc(id,req.body)
//     .then((user)=>{
//       res.status(200).json(user);
//     })
//     .catch((err)=>{
//       res.status(404).json(err)
//     })
//   }catch(err){
//     res.status(500).json(err);
//   }
// };

module.exports = {
  findUsers,
  findUserById,
  postUser,
  deleteUser,
  postLogin,
  // updateLocation,
  updateUser,
};
