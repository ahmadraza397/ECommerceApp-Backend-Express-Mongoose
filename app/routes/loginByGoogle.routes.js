const express = require("express");
const router = express.Router();
const googleLoginMethod = require("../controllers/GoogleLogin.controller");

//login and register by google

router.post("/users/google", googleLoginMethod.googleLogin);

module.exports = router;
