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
        loginResponse.token = CreateToken(user._id, user.email, user.username);
        res.json(loginResponse);
      });
    }else{
      res.json({success: false, message: "User not found"});
    }
  }).catch(err => {
    res.status(500).json({err});
  });
}



/**
 * *CREATE NEW USER
 * @param {*} req  Has the body from request
 * @param {*} res Response
 * @return JSON of new user from User Model
 */
function SignUp(req, res) {
  const { username, email, password } = req.body;

  Hash(password).then(hashedPassword => {
    console.log('hashedPassword', hashedPassword);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log('user password', user.password);

    return user.save();
  })
    .then(newUser => {

      delete newUser.password;

      const token = CreateToken(newUser._id, newUser.email, newUser.username);

      res.status(200).json({
        success: true,
        message: "New user added successfully",
        newUser,
        token
      });
    })
    .catch((error) => {
      console.log("Error message", error);
      res.status(400).json({
        success: false,
        message: "Something went wrong during process",
        error: error,
      });
    });
}

function CreateToken(userID, email, username){
  const payload = {
    id: userID,
    email,
    username
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

  return token;
}

module.exports = {
  Login,
  SignUp
}