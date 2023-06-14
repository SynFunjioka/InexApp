const express = require("express");
const bodyParser = require("body-parser");

//* Model
const { User } = require("../models/user.model");

/**
 * *GET USERS METHOD
 * @param {*} req Has the queries from request
 * @param {*} res Response
 * @return JSON of user from User Model
 */
//📌 Implement queries
function GetUsers(req, res) {
  const myReq = req.query;
  console.log("My get queries", myReq);

  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
}

/**
 * *GET USER BY ID
 * @param {*} req Has the ID param from request
 * @param {*} res Response
 *  @return JSON of use from User Model
 */
function GetUser(req, res) {
  const { id } = req.params;
  //   console.log("My request params", id);

  User.findById(id)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
}

/**
 * *CREATE NEW USER
 * @param {*} req  Has the body from request
 * @param {*} res Response
 * @return JSON of new user from User Model
 */
function CreateUser(req, res) {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password,
  });

  user.save().then((newUser) => {
    res.status(200).json({
      success: true,
      message: "New user added successfully",
      newUser,
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

/**
 * *UPDATE USER
 * @param {*} req  Has the body from request
 * @param {*} res Response
 * @return JSON of new user from User Model
 */
function UpdateUser(req, res) {
  const { id } = req.params;
  const { username, email, password  } = req.body;

  User.findOneAndUpdate( { _id: id },  {username, email, password}, { new: true }).then((resUser) => {
    if (!resUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, documento: resUser });

  }).catch(error => {
      console.error("Error on updating user model:", error);
      res.status(500).json({ message: "Error on updating user", error });
    });
}

/**
 * *DELETE USER
 * @param {*} req  Has the  ID param from request
 * @param {*} res Response
 * @return JSON with user deleted data from User Model.
 */
function DeleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id).then(resDelete => {
    if (!resDelete) {
      return res.status(404).json({ error: "The user does not exist" });
    }
    res.status(200).json({ success: true, userDeleted: resDelete });
  }).catch(error => {
     console.error("Error on deleting user model:", error);
     res.status(500).json({ message: "Error on deleting user", error });
  });

}


/**
 * * LOGIC DELETE USER
 * @param {*} req  Has the  ID param from request
 * @param {*} res Response
 * @return JSON with user deleted data from User Model.
 */
function DeleteUser_Logic(req, res) {
  const { id } = req.params;

  User.findOneAndUpdate(
    { _id: id },
    { deleted: true },
    { new: true }
  ).then((resUser) => {
      if (!resUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, userDeleted: resUser });
    })
    .catch((error) => {
      console.error("Error on updating user model:", error);
      res.status(500).json({ message: "Error on updating user", error });
    });
}

module.exports = {
  GetUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  DeleteUser_Logic,
};
