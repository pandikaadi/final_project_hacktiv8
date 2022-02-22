const { Vote, Order, sequelize } = require("../models");

const upVote = async (req, res) => {
  // const { id } = req.currentUser
  // const { barberId } = req.params
  const {orderData, star } = req.body
  const t = await sequelize.transaction();
  try {
    const vote = await Vote.create({ userMonggoId: req.currentUser.userMonggoId, barberId: orderData.barberId, value: star }, {transaction: t});
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
    console.log(err,'<<<<< ERROR VOTES');
    if (!err.errors){
      res.status(500).json(err);
    }else{
      err.errors.map(el=>{
        if ( el.message === 'value cant be null'){
          res.status(400).json(el.message)
        }else{
         res.status(400).json(el.message)
        }
       })
    }
    await t.rollback();
  }
};

const getVotes = async (req, res) => {
  const { barberId } = req.params
  try {
    const vote = await Vote.findAll({
      where:{barberId:barberId}
    });

      res.status(200).json(vote);
 
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { upVote, getVotes };
