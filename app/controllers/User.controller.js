const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users.model");

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    if (!users) {
      res.status(404).send({
        message: "Not Found!",
      });
    } else {
      res.status(200).send({
        status: "200",
        message: "Success!",
        data: users,
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

//Creating User
const createUser = async (req, res) => {
  //validation;
  if (!req.body.name) {
    res.status(400).send({
      message: "User name cannot be empty",
    });
  }
  const checkUser = await User.findOne({ email: req.body.email });
  console.log(checkUser);
  if (checkUser) {
    res.status(400).send({
      message: "User already Exists!",
    });
  } else {
    // creating user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcryptjs.hashSync(req.body.passwordHash, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });
    // saving User in the database
    user
      .save()
      .then((user) => {
        console.log(user);
        res.status(200).send({
          status: "200",
          message: "Succeed",
          data: user,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error while saving in Database!",
        });
      });
  }
};

//get single user by Id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .select("-passwordHash")
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: "User not found with id" + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.status(505).send({
        message: "Error getting User with id " + req.params.userId,
      });
    });
};

//user Login
const userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    res.status(400).send("User not Found!");
  }
  if (user && bcryptjs.compareSync(req.body.passwordHash, user.passwordHash)) {
    //implementing jwt
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      status: "200",
      user: user.email,
      token: token,
      message: "Authenticated!",
      data: user,
    });
  } else {
    res.status(400).send({
      status: "400",
      message: "Wrong Password",
    });
  }
};

//user register
const userRegister = async (req, res) => {
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.passwordHash, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = user.save();
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  userLogin,
};
