//jshint esversion:6
require('dotenv').config();
// console.log(process.env.API_KEY);

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption"); <- level2
// const md5 = require("md5"); <- level3

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

//use and connect to mongoDB
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});


//a new schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
//For convenience, you can also pass in a single secret string instead of two keys.
// const secret = "Thisisourlittlesecret";
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

//use schema to set up a model
const User = mongoose.model("User", userSchema);
//view -> read -> get

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login");
});

//storing email and password -> user database

app.post("/register", function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //<- store this hash
    // Store hash in the password DB.
    const newUser = new User({
      email: req.body.username, //correponding to 14 and 18 of register.ejs
      password: hash
    });

    newUser.save(function(err) {
      if (err) res.render(err);
      else res.render("secrets");
    });
  });

});

//check for credentials
app.post("/login", function(req, res) {

  const username = req.body.username;
  const password = req.body.password; //this is plaintext entered by user

  User.findOne({
    email: username
  }, function(err, foundUser) {
    if (err) console.log(err);
    else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          // result == true
          if (err) console.log(err);
          else {
            if (result) res.render("secrets");
          }
        });
      }
    }
  });
});



app.listen(3000, function(req, res) {
  console.log("Server started on port 30000.");
})
