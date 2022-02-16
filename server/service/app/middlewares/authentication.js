const {User} = require('../models/index')
const { verifyToken} = require('../helpers/jwt');

const authentication = async (req,res,next)=>{
  try{
    const {access_token} = req.headers 
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)
    
    req.currentUser = {id: user.id,role: user.role, username:user.username, email:user.email}

    if( access_token && user){
      next()
    }else{
      res.status(401).json({message:'Unauthorized'})
    }
  } catch(err){
    if (err.name === 'JsonWebTokenError' ){
      res.status(401).json(err)
    }else{

      res.status(500).json(err)
    }
  }

}

module.exports = authentication