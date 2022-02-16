const cors = require("cors");
const express = require("express");
const app = express();
const port = 4001;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;