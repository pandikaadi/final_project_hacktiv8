const { Service } = require("../models");

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    if (services) {
      res.status(200).json(services);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findOne({
      where: { id: id },
    });
    if (service) {
      res.status(200).json(service);
    } else {
      throw new Error ('not found')
    }
  } catch (err) {
    if ( err.message === 'not found'){
     res.status(404).json({ messege: "Service not found" });
    }else{
      res.status(500).json(err);
    }
  }
};
const postService = async (req, res) => {
  const { name, price } = req.body;
  try {
    const service = await Service.create({
      name,
      price,
    });
    if (service) {
      res.status(201).json(service);
    } else {
      res.status(404).json({ messege: "Bad request" });
    }
  } catch (err) {
    if (!err.errors){
      res.status(500).json(err)
    }else{
      err.errors.map(el=>{
        if(el.message === 'name is required'){
          res.status(400).json(el)
        } else if ( el.message === 'price is required'){
          res.status(400).json(el)
        } 
      })
    }
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params
  try {
    const service = await Service.findOne({
      where: { id: id },
    });
    if(service){
      await Service.destroy({
        where:{id:id}
      })
      res.status(200).json({messege:'service success to delete'})
    }else{
      throw new Error ('not found')
    }
  } catch (err) {
    if(err.message === 'not found'){
      res.status(404).json(err.message)
    }else{
      res.status(500).json(err)
    }
  }
};

const updateService = async (req, res) => {
  const { id } = req.params
  const { name , price } = req.body
  try {
    const service = await Service.findOne({
      where: {
        id: id,
      },
    });
    if( service){
      await Service.update({
        name:name,
        price:price
      },{
        where:{id:id}
      })
      res.status(200).json({messege:'service success to update'})
    }else{
      throw new Error('not found')
    }
  } catch (err) {
    if (err.message === 'not found'){
      res.status(404).json(err.message)
    }else{
      res.status(500).json(err)
    }
  }
};


module.exports = { getServices, getServiceById, postService, deleteService , updateService};
