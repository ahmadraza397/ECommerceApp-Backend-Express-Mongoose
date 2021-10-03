const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users.model");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "167447416933-katmer568scuu5v8uou11k41954m3p5d.apps.googleusercontent.com"
);

//login and register by google
const googleLogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "167447416933-katmer568scuu5v8uou11k41954m3p5d.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            res.status(400).send({
              message: "Something went wrong...!",
            });
          } else {
            if (user) {
              const secret = process.env.secret;
              const token = jwt.sign({ userId: user.id }, secret, {
                expiresIn: "1d",
              });
              res.status(200).send({
                status: "200",
                user: user.email,
                token: token,
                message: "Authenticated!",
                data: user,
              });
            } else {
              let password = bcryptjs.hashSync(email + process.env.secret, 10);
              let newUser = new User({
                name: name,
                email: email,
                passwordHash: password,
                phone: req.body.phone || "",
                isAdmin: req.body.isAdmin || false,
                street: req.body.street || "",
                apartment: req.body.apartment || "",
                zip: req.body.zip || "",
                city: req.body.city || "",
                country: req.body.country || "",
              });
              newUser.save((err, data) => {
                if (err) {
                  res.status(400).send({
                    message: "Something went wrong..!!",
                  });
                }
                const secret = process.env.secret;
                const token = jwt.sign({ userId: data.id }, secret, {
                  expiresIn: "1d",
                });
                res.status(200).send({
                  status: "200",
                  user: data.email,
                  token: token,
                  message: "Authenticated!",
                  data: data,
                });
              });
            }
          }
        });
      }
    });
};

module.exports = {
  googleLogin,
};
