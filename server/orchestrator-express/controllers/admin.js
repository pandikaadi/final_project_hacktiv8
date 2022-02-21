const axios = require("axios");

const getAll = async (req, res) => {
  try {
      const { data: app } = await axios({
        method: "GET",
        headers: {
          access_token: req.headers.access_token
        },
        url: "http://localhost:4001/admin/all",
      });
      const { data: users } = await axios({
        method: "GET",
        url: "http://localhost:4002/users",
      });
      res.status(200).json({app, users});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAll
}