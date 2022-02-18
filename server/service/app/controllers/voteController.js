const { Vote } = require("../models");

const upVote = async (req, res) => {
  console.log(req.currentUser);
  const { id } = req.currentUser
  const { barberId } = req.params
  console.log(req.params);
  try {
    const vote = await Vote.create({ barberId,userId:id });
    if (vote) {
      res.status(201).json(vote);
    }
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
};

const getVotes = async (req, res) => {
  try {
    const vote = await Vote.findAll();
    if (vote) {
      res.status(200).json(vote);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { upVote, getVotes };
