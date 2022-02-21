const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const router = require("./routes");
const mongoose = require("mongoose") // mongoose

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);

mongoose
	.connect("mongodb://localhost:27017/shave8", { useNewUrlParser: true })
	.then(() => {

		if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log("app connect to " + port);
      });
    }
	});

module.exports = app;
