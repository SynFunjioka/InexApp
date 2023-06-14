const express = require("express");

//* Model
const { Transaction } = require("../models/transaction.model");
const { User } = require("../models/user.model");

/**
 * *GET TRANSACTIONS METHOD
 * @param {*} req Has the queries from request
 * @param {*} res Response
 * @return JSON of transaction from Transactions Model
 */
//📌 Implement queries
function GetTransactions(req, res) {
  const myReq = req.query;
  //   console.log("My get queries", myReq);

  Transaction.find()
    .then((trcn) => res.json(trcn))
    .catch((error) => res.json(error));
}

/**
 * *GET TRANSACTION BY ID
 * @param {*} req Has the ID param from request
 * @param {*} res Response
 * @return JSON of transaction from Transaction Model
 */
function GetTransaction(req, res) {
  const { id } = req.params;
  //   console.log("My request params", id);

  Transaction.findById(id)
    .then((transaction) => res.json(transaction))
    .catch((error) => res.json(error));
}

/**
 * *CREATE NEW TRANSACTION
 * @param {*} req  Has the body from request
 * @param {*} res Response
 * @return JSON of new transaction from Transaction Model
 */
async function CreateTransaction(req, res) {
  const { user_id, description, type, mount } = req.body;

  const transaction = new Transaction({
    user_id,
    description,
    type,
    mount
  });

  Promise.all([
    transaction.save(),
    User.findByIdAndUpdate(user_id, { $push: { transactions: transaction._id } }, { new: true })
  ])
  .then(([transactionRes, userRes]) => {
    res.status(200).json({
      success: true,
      message:'Transaction created and assigned to user',
      transaction: transactionRes,
      user: userRes
    });
  })
  .catch((error) => {
    res.status(500).json({ success: false, message: 'Error on creating the new transaction', error });
  });
}

/**
 * *UPDATE TRANSACTION
 * @param {*} req  Has the body from request
 * @param {*} res Response
 * @return JSON of new transaction from Transaction Model
 */
function UpdateTransaction(req, res) {
  const { id } = req.params;
  const { description, type, mount } = req.body;

  Transaction.findOneAndUpdate(
    { _id: id },
    { description, type, mount },
    { new: true }).then((resTransaction) => {
    if (!resTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction: resTransaction });

  }).catch(error => {
      console.error("Error on updating transaction model:", error);
      res.status(500).json({ message: "Error on updating transaction", error });
    });
}

/**
 * *DELETE TRANSACTION
 * @param {*} req  Has the  ID param from request
 * @param {*} res Response
 * @return JSON with transaction deleted data from Transaction Model.
 */
function DeleteTransaction(req, res) {
  const { id } = req.params;

  Transaction.findByIdAndRemove(id)
    .then((resDelete) => {
      if (!resDelete) {
        return res.status(404).json({ error: "The transaction does not exist" });
      }

      return User.findByIdAndUpdate(
        resDelete.user_id,
        { $pull: { transactions: resDelete._id } },
        { new: true }
      );
    })
    .then((userModified) => {
      if (!userModified) {
        return res.status(500).json({ success: false, message: "Something went wrong during deleting" });
      }

      res.status(200).json({ success: true, transactionDeleted: id });
    })
    .catch((error) => {
      console.error("Error on deleting transaction:", error);
      res.status(500).json({ message: "Error on deleting transaction", error });
    });
}


/**
 * * LOGIC DELETE TRANSACTION
 * @param {*} req  Has the  ID param from request
 * @param {*} res Response
 * @return JSON with transaction deleted data from Transaction Model.
 */
function DeleteTransaction_Logic(req, res) {
  const { id } = req.params;

  Transaction.findOneAndUpdate(
    { _id: id },
    { deleted: true },
    { new: true }
  ).then((resTransaction) => {
      if (!resTransaction) {
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found" });
      }
      res.status(200).json({ success: true, transactionDeleted: resTransaction });
    })
    .catch((error) => {
      console.error("Error on updating transaction model:", error);
      res.status(500).json({ message: "Error on updating transaction", error });
    });
}

module.exports = {
  GetTransactions,
  GetTransaction,
  CreateTransaction,
  UpdateTransaction,
  DeleteTransaction,
  DeleteTransaction_Logic
};
