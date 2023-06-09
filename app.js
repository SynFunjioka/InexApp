const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//* My modules
const { mongoURI, options } = require("./config/mongo.config");

//* Modals
const { User } = require("./models/user.model");

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

app.get("/", async (req, res) => {
  res.send("Welcome to the InexApp API");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

//Ejemplo para crear un usuario

/* const user = new User({
    username: "root",
    email: "root@root.com",
    password: "12345678",
  });

  await user
    .save()
    .then((res) => {
      console.log("Usuario root registrado", res);
    })
    .then((error) =>
      console.error("Something went wrong during process", error)
    ); */
