const { Vote } = require("../models");

const upVote = async (req, res) => {
  const { id } = req.currentUser
  const { barberId } = req.params
  try {
    const vote = await Vote.create({ barberId,userId:id });
    if (vote) {
      res.status(201).json(vote);
    }
  } catch (err) { 
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
