const User = require("../models/user");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const findUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const findUserById = (req, res) => {
  const { id } = req.params;
  User.findOne(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const postUser = (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  User.findAll().then((users) => {
    if (users) {
      const totalId = users.length;
      User.create({
        id: totalId + 1,
        username,
        email,
        password,
        phoneNumber,
        lat:"",
        long:""
      })
        .then((result) => {
          if (result) {
            User.findAll().then((users) => {
              if (users) {
                const id = users.length;
                User.findOne(id).then((user) => {
                  res.status(201).json(user);
                });
              }
            });
          }
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });
};

const updateLocation = (req,res) => {
  
  const { lat, long } = req.body;
  const { id } = req.params
  try{
    User.updateLoc(id,req.body)
    .then((user)=>{
      res.status(200).json(user);
    })
    .catch((err)=>{
      res.status(404).json(err)
    })
  }catch(err){
    res.status(500).json(err);
  }
};

const updateUser = (req,res) => {
  
  const { username, email, password, phoneNumber } = req.body;
  const { id } = req.params
  try{
    User.update(id,req.body)
    .then((user)=>{
      res.status(200).json(user);
    })
    .catch((err)=>{
      res.status(404).json(err)
    })
  }catch(err){
    res.status(500).json(err);
  }
};


const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findOne(id)
    .then((user) => {
      if (user) {
        User.destroy(id)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const postLogin = (req, res) => {
  const { email, password } = req.body;
  

  User.findOneCompare(email)
    .then((user) => {
      if (!user) {
        console.log(`nullified`);
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        if (!compareHash(password, user.password)) {
          res.status(401).json({ message: "Invalid email/password" });
        } else {
          const payload = {
            id: user.id,
            userMonggoId: user._id,
            username: user.username,
            role: user.role,
          };
          const token = createToken(payload);
          res.status(200).json({
            access_token: token,
            role: user.role
          });
        }

      }

    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
};
module.exports = {
  findUsers,
  findUserById,
  postUser,
  deleteUser,
  postLogin,
  updateLocation,
  updateUser
};
