const express = require("express");
const router = express.Router();

const {
  Login,
} = require("../controllers/auth.controller");

router.post("/login", Login);

module.exports = router;
