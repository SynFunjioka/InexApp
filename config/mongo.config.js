require("dotenv").config();

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

module.exports = {
  mongoURI: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
  options: {
    useNewUrlParser: true, //* Utilizar el nuevo motor de análisis de URL
    useUnifiedTopology: true, //* Utilizar el nuevo motor de topología
  },
};
