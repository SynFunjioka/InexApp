const express = require("express");
const router = express.Router();

const {
  GetUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  DeleteUser_Logic,
} = require("../controllers/user.controller");

router.get("/", GetUsers);

router.get("/:id", GetUser);

router.post("/", CreateUser);

router.put("/:id", UpdateUser);

router.delete("/:id", DeleteUser);

//🔵Otras rutas

//*Borrado LOGICO
router.put("/delete/:id", DeleteUser_Logic);


module.exports = router;
