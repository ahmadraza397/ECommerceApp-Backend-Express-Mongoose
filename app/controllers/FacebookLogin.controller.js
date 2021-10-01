const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../model/Users.model");

//login and register by Facebook
const facebookLogin = async (req, res) => {
  const checkUser = await User.findOne({ email: req.body.email });
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

        const secret = process.env.secret;
        if (user) {
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
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error while saving in Database!",
        });
      });
  }
};

module.exports = {
  facebookLogin,
};
