const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const { Hash, HashCompare} = require("../util/secret.util");

//* Model
const { User } = require("../models/user.model");

/**
 * @param {*} req Login body from request
 * @param {*} res 
 */
function Login(req, res) {
  const {email, password} = req.body;

  User.findOne({email}).then((user) => {
    if(user){
      HashCompare(password, user.password).then(match => {
        let loginResponse = {};
        loginResponse.success = match;

        if(!match){
          loginResponse.message = "Invalid password";
        }
        loginResponse.user = user;
        loginResponse.token = CreateToken(user._id, user.email);
        res.json(loginResponse);
      });
    }else{
      res.json({success: false, message: "User not found"});
    }
  }).catch(err => {
    res.status(500).json({err});
  });
}

function CreateToken(userID, email){
  const payload = {
    id: userID,
    email
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '5s' });

  return token;
}

module.exports = {
  Login
}