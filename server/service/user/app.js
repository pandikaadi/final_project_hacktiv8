const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const router = require("./routes");
const { connect } = require("./config/mongoConnection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);

connect()
  .then((client) => {
    app.listen(port, () => {
      console.log("app connect to " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
