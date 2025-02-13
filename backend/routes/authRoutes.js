const express = require("express");
const { loginUser, registerUser } = require("../controllers/authControllers");
const router = express.Router();

//middleware

router.post("/login", loginUser); //auth/login

router.post("/register", registerUser); //auth/register

module.exports = router;
