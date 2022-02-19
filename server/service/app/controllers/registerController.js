const { User } = require("../models/index");
const sendMail = require("../helpers/nodemailer")
const postRegister = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    const user = await User.create({ username, email, password, phoneNumber });
    if (user) {
      // sendMail(email,username)
      res.status(201).json(user);
    } else{
      res.status(500).json({message:'Internal server error'})
    }
  } catch (err) {
    err.errors.map(el=>{
      if(el.message === 'Username is required'){
        res.status(400).json(el)
      } else if ( el.message === 'Email is required'){
        res.status(400).json(el)
      } else if ( el.message === 'Password is required'){
        res.status(400).json(el)
      } else if ( el.message === 'Phone Number is required'){
        res.status(400).json(el)
      } 
    })
    
  }
};

module.exports = { postRegister };
