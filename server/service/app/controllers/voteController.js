const { Vote, Order, sequelize } = require("../models");

const upVote = async (req, res) => {
  // const { id } = req.currentUser
  // const { barberId } = req.params
  const {orderData, star } = req.body
  const t = await sequelize.transaction();
  console.log(star);
  console.log(Vote, `>>>VOTE`, Order);
  try {
    console.log(await Vote.findAll());
    const vote = await Vote.create({ userMonggoId: req.currentUser.userMonggoId, barberId: orderData.barberId, value: star }, {transaction: t});
    console.log(vote);
    if(vote) {
      const updateStatOrder = await Order.update({statusBarber: "Voted"}, {where: {
        id: orderData.id
      }}, {transaction: t})

      if(updateStatOrder) {
        await t.commit();
        res.status(201).json({updateStatOrder, vote})
      }

    }
  } catch (err) { 
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
