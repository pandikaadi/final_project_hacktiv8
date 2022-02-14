const { Barber, BarberLocation } = require("../models/index");
const Redis = require("ioredis");
const redis = new Redis();


const getBarbers = async (req, res) => {

  try {
    const barbersCache = await redis.get("barbers")
    if(barbersCache){
      res.status(200).json(JSON.parse(barbersCache))
    }else{
      const barbers = await Barber.findAll();
      if (barbers) {
        await redis.set("barbers",JSON.stringify(barbers))
        res.status(200).json(barbers);
      }

    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const getBarberById = async(req,res) => {
  const { id } = req.params
  try{
    const barber = await Barber.findOne({
      where:{id:id},
    })
    res.status(200).json(barber)
  }catch(err){
    res.status(500).json(err)
  }
}

const postBarber = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const barber = await Barber.create({ name, email, password, phoneNumber });
    if (barber) {
      await redis.del("barbers");
      res.status(201).json(barber);
    }
  } catch (err) {
    err.errors.map(el=>{
      if(el.message === 'Name is required'){
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
module.exports = { getBarbers, postBarber, getBarberById };
