const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");

// User model
const User = require("../models/user");

// Register form
router.get("/register", function (req, res) {
  res.render("register");
  
});

// Register process
router.post("/register", function (req, res) {
  const name = req.body.name;
  const surname = req.body.surname;
  const monthBirth = req.body.monthBirth;
  const yearBirth = req.body.yearBirth;
  const country = req.body.country;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("surname", "Surname is required").notEmpty();
  req.checkBody("monthBirth", "Month of birth is required").notEmpty();
  req.checkBody("yearBirth", "Year of birth is required").notEmpty();
  req.checkBody("country", "Country is required").notEmpty();
  req.checkBody("email", "Email is required").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password", "Password must be longer than 5 characters").isLength(6);
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    
    res.render("register", {
      errors: errors,
      
      
    });
  } else {
    let newUser = new User({
      name: name,
      surname: surname,
      monthBirth: monthBirth,
      yearBirth: yearBirth,
      country: country,
      email: email,
      username: username,
      password: password,
    });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.error(err);
        }
        newUser.password = hash;

        newUser.save(function (err) {
          if (err) {
            console.error(err);
            return;
          } else {
            req.flash("success", "You are now registered and can log in");
            res.redirect("/users/login");
          }
        });
      });
    });
  }
});

// Login form
router.get("/login", function (req, res) {
  res.render("login");
});

// Login process
router.post("/login", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/articles/home",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout form
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/users/login");
});


//forgot password
router.get("/forget", function (req, res) {
  res.render("forget");
});

router.post("/forget", function (req, res) {
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  let errors = req.validationErrors();

  if (errors) {
    res.render("forget", {
      Title:"Forgot passord?",
      errors: errors,
    });
  }
  // send mail for forgot

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7deb634e45f784",
      pass: "7e754edc512f9f",
    },
  });

  var mailOptions = {
    from: "site@askpassword.com",
    to: "valmailtrap@mailtrap.fr",
    subject: "Mot de passe oublié ",
    text: "Password forgot by "+ req.body.name + " with the email " + req.body.email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      req.flash("success", "Your email has been send");
      res.redirect("/users/login");
    }
  });
});
module.exports = router;
