const { Order, Barber, Service, User } = require("../models/index");

const sendMailOrder = require("../helpers/nodemailerOrder");

const postOrder = async (req, res) => {
  const userId = req.currentUser.id;
  
  const { barberId, date, hour, serviceId } = req.body;

  try {
    const order = await Order.create({
      userId,
      barberId,
      date,
      hour,
      serviceId,
    });
    if (order) {
      const findOrder = await Order.findOne({
        where: { id: order.id },
        include: [{ model: User }, { model: Barber }, { model: Service }],
      });
      if (findOrder) {
        // sendMailOrder(
        //   findOrder.User.email,
        //   findOrder.User.username,
        //   findOrder.Barber.name,
        //   findOrder.Service.name
        // );
        res.status(201).json({ findOrder });
      }
    } 
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "bad request" });
    } else {
      err.errors.map((el) => {
        if (el.message === "date is required") {
          res.status(400).json(el);
        } else if (el.message === "hour is required") {
          res.status(400).json(el);
        } else if (el.message === "date cant be null") {
          res.status(400).json(el);
        } else if (el.message === "hour cant be null") {
          res.status(400).json(el);
        } else {
         
        }
      });
    }
  }
};

const getOrdersByUserId = async (req, res) => {
  // get all orders by user id
  const { id } = req.currentUser;
  try {
    const orders = await Order.findAll({
      where: { userId: id },
      include: [{ model: Barber }, { model: Service }],
    });
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrdersByBarberId = async (req, res) => {
  // get all orders by barber id
  const { id } = req.currentBarber;
  
  try {
    const orders = await Order.findAll({
      where: { barberId: id },
      include: [{ model: Barber }, { model: Service }],
    });
    if (orders) {
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrderByid = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id: id },
      include: [{ model: Barber }, { model: Service }],
    });
    if (order) {
      res.status(200).json(order);
    }
  } catch (err) {
    
    res.status(500).json(err);
  }
};


const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({
      where: { id: id },
    });
    if (order) {
      await Order.destroy({
        where: { id: id },
      });
      res.status(200).json({ message: "Order success to delete" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStatus = async(req,res) => {
  const { id } = req.params
  const { statusBarber } = req.body
  try{
      const findOrder = await Order.findOne({where:{id:id}})
      if(findOrder){
        const result = await Order.update({
          statusBarber:statusBarber,
        },{
          where:{id:id},
          returning:true
        })
        res.status(200).json(result[1][0])
      } else {
        res.status(500).json(err)
      }

  }catch(err){
    res.status(500).json(err)
  }
}
module.exports = {
  postOrder,
  getOrdersByUserId,
  getOrderByid,
  deleteOrder,
  getOrdersByBarberId,
  updateStatus
};
