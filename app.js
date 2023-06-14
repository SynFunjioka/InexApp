const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//* My modules
const { mongoURI, options } = require("./config/mongo.config");

//* My Routes
const userRoutes = require("./routes/user.route");
const transactionRoutes = require("./routes/transaction.route");

//* Connect to MongoDB
mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//🔵 Route imports will be here
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
//🔵 =========================================

app.get("/", async (req, res) => {
  res.send("Welcome to the InexApp API");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
