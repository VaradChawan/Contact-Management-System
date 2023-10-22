const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
} = require("../controller/userController");

router.post("/loginUser", loginController);

router.post("/registerUser", registerController);

module.exports = router;
