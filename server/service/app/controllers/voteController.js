const { Vote, Order, sequelize } = require("../models");

const upVote = async (req, res) => {
  // const { id } = req.currentUser
  // const { barberId } = req.params
  const {orderData, star } = req.body
  const t = await sequelize.transaction();
  try {
    const vote = await Vote.create({ barberId: orderData.barberId, userId:req.currentUser.userMonggoId, value: star }, {transaction: t});
    if(vote) {
      const updateStatOrder = await Order.update({statusBarber: "Voted"}, {where: {
        id: orderData.id
      }}, {transaction: t})

      if(updateStatOrder) {
        res.status(201).json({updateStatOrder, vote})
      }

    }
  } catch (err) { 
    console.log(err);
    await t.rollback();
    res.status(500).json(err);
  }
};

const getVotes = async (req, res) => {
  const { barberId } = req.params
  try {
    const vote = await Vote.findAll({
      where:{barberId:barberId}
    });
    if (vote) {
      res.status(200).json(vote);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { upVote, getVotes };
