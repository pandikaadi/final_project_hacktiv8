const { Vote } = require("../models");

const upVote = async (req, res) => {
  const { userMonggoId } = req.currentUser
  const  barberId = Number(req.params.barberId)
  const {value} = req.body 
  try {
    const vote = await Vote.create({ barberId, userMonggoId, value });
    if (vote) {
      res.status(201).json(vote);
    }
  } catch (err) { 
    console.log(err,'<<<<<< ERRR VOTES');
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
