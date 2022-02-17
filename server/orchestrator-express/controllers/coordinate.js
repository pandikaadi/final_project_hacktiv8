const axios = require('axios')

const translateCoordinate = async (req, res) => {
  const { lat, long } = req.body;
  console.log(req.body);
  try {
    const translated = await axios({
      method: "GET",
      url: `https://nominatim.openstreetmap.org/reverse?lat=${+lat}&lon=${+long}&format=json`,
    });
    res.status(200).json(translated.data.display_name);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { translateCoordinate}