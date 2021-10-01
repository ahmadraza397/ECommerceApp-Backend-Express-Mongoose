const express = require("express");
const router = express.Router();
const facebookLoginMethod = require("../controllers/FacebookLogin.controller");

//login and register by facebook

router.post("/users/facebook", facebookLoginMethod.facebookLogin);

module.exports = router;
