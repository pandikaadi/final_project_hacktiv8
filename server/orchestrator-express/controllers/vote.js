const axios = require('axios')
const { verifyToken } = require("../helpers/jwt");


const postVote = async (req, res) => {

  const token = req.headers.access_token

  console.log(req.body, `>>>>`);

  try {
    const { data: service } = await axios({
      method: "POST",
      url: `http://localhost:4001/votes`,
      data: req.body,
      headers:{
        access_token:token
      }
    });
    if (service) {
      res.status(201).json(service);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getVotes = async (req, res) => {
  const { barberId } = req.params
  const token = req.headers.access_token
  try {
    const { data: votes } = await axios({
      method: "GET",
      url: `http://localhost:4001/votes/${barberId}`,
    });
    if ( votes ) {
      res.status(200).json(votes);
    } else {
      res.status(404).json({ message: "failed to vote" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { postVote, getVotes }