const paymentHandler = async (req, res) => {
  try {
      const { data: payment } = await axios({
        method: "POST",
        url: "http://localhost:4001/paymentHandler",
        data: req.body
      });
      res.status(200).json(payment);
  } catch (err) {
    
    res.status(500).json(err);
  }
};

module.exports = {
  paymentHandler
}