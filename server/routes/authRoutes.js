const { loginUser, registerUser } = require("../Controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
