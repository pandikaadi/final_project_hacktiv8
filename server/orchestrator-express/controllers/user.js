const axios = require("axios");

const getUsers = async (req, res) => {
  try {
    const { data: users } = await axios({
      method: "GET",
      url: "http://localhost:4002/users",
    });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "users not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data: user } = await axios({
      method: "GET",
      url: `http://localhost:4002/users/${id}`,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const postUser = async (req, res) => {
  const { username, email, password, phoneNumber, isAdmin } = req.body;
  // console.log(req.body);
  try {
    const { data: user } = await axios({
      method: "POST",
      url: "http://localhost:4002/users",
      data: req.body,
    });
    if (user) {
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password);
  try {
    const { data: token } = await axios({
      method: "POST",
      url: "http://localhost:4002/users/login",
      data: req.body,
    });
    if (token) {
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(500).json(err.response.data);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, phoneNumber } = req.body;
  try {
    const { data: result } = await axios({
      method: "PUT",
      url: `http://localhost:4002/users/${id}`,
      data: req.body,
    });
    if (result) {
      res.status(201).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUsers, getUserById, postUser, loginUser, updateUser };
