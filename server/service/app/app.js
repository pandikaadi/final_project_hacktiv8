const cors = require("cors");
const express = require("express");
const { paymentHandler } = require("./controllers/orderController");
const app = express();
const port = 4001;
const router = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/paymentHandler", paymentHandler);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
