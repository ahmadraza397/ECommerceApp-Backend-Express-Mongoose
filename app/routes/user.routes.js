const express = require("express");
const router = express.Router();
const userMethods = require("../controllers/User.controller");

//get all users
router.get("/users", userMethods.getUsers);

//create user
router.post("/users", userMethods.createUser);

//get single user by id
router.get("/users/:userId", userMethods.getUserById);

//user login
router.post("/users/login", userMethods.userLogin);

//user Register
router.post("/users/register", userMethods.userRegister);

module.exports = router;
