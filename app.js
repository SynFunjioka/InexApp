const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//* My modules
const { mongoURI, options } = require("./config/mongo.config");

mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/fileName.html");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
