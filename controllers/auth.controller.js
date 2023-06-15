const express = require("express");
const bodyParser = require("body-parser");

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
        res.json(loginResponse);
      });
    }else{
      res.json({success: false, message: "User not found"});
    }
  }).catch(err => {
    res.status(500).json({err});
  });
}

module.exports = {
  Login
}