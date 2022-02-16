const axios = require("axios");

const getOrders = async (req, res) => {
  console.log(req.headers.access_token);
  const token = req.headers.access_token;
  try {
    const { data: orders } = await axios({
      method: "GET",
      url: "http://localhost:4001/orders",
      headers: {
        access_token: token,
      },
    });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "orders not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const postOrder = async (req, res) => {
  const token = req.headers.access_token;
  const { barberId, date, hour, serviceId } = req.body;
  try {
    const { data: orders } = await axios({
      method: "POST",
      url: "http://localhost:4001/orders",
      data: req.body,
      headers: {
        access_token: token,
      },
    });
    if (orders) {
      res.status(201).json(orders);
    } else {
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req,res)  => {
  const token = req.headers.access_token;
  const {id} = req.params
  try{
    const { data: orders } = await axios({
      method: "DELETE",
      url: `http://localhost:4001/orders/${id}`,
      headers: {
        access_token: token,
      },
    });
    res.status(200).json(orders)
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports = { getOrders, postOrder,deleteOrder };
