const { User } = require("../models/index");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!result) {
      throw { message: "Invalid email/password" };
    } 
    if (!compareHash(password, result.password)) {
      throw { message: "Invalid email/password" };
    }

    const payload = {
      id: result.id,
      username: result.username,
      role: result.role,
    };
    const token = createToken(payload);
    
    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    console.log(err);
    if(err.message === "Invalid email/password"){
      res.status(401).json(err);
    }else{
      res.status(500).json(err)
    }
    
  }
};

module.exports = { postLogin };
