const express = require("express");
const router = express.Router();

const {
  GetTransactions,
  GetTransaction,
  CreateTransaction,
  UpdateTransaction,
  DeleteTransaction,
  DeleteTransaction_Logic,
} = require("../controllers/transaction.controller");

router.get("/", GetTransactions);

router.get("/:id", GetTransaction);

router.post("/", CreateTransaction);

router.put("/:id", UpdateTransaction);

router.delete("/:id", DeleteTransaction);

//🔵Otras rutas

//*Borrado LOGICO
router.put("/delete/:id", DeleteTransaction_Logic);


module.exports = router;
