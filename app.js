const express = require("express");
const mongoose = require("mongoose");

//* My modules
const { mongoURI, options } = require("./config/mongo.config");

//* My Routes
const userRoutes = require("./routes/user.route");
const transactionRoutes = require("./routes/transaction.route");
const authRoutes = require("./routes/auth.router");

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen (cambia '*' por el origen específico si es necesario)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
  next();
});

//🔵 Route imports will be here
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/auth", authRoutes);
//🔵 =========================================

app.get("/", async (req, res) => {
  res.send("Welcome to the InexApp API");
});

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
