//jshint esversion:6
require('dotenv').config();
// console.log(process.env.API_KEY);

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption"); <- level2
// const md5 = require("md5"); <- level3

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate'); //so that findOrCreate would work

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

//initialize session
app.use(session({
  secret: "any long string",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true
  }
}));

app.use(passport.initialize());
app.use(passport.session()); //from middleware

//use and connect to mongoDB
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});


//a new schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});
//Plugin Passport-Local Mongoose
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//For convenience, you can also pass in a single secret string instead of two keys.
// const secret = "Thisisourlittlesecret";
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

//use schema to set up a model
const User = mongoose.model("User", userSchema);

//Configure Passport/Passport-Local
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));


//view -> read -> get

app.get("/", function(req, res) {
  res.render("home");
});

app.route("/auth/google")
  .get(passport.authenticate('google', { //initialiate authentication
    scope: ['profile']
  }));

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });


app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/secrets", function(req, res) {
  User.find({"secret": {$ne: null}}, function(err, foundUser) {
    if (err) console.log(err);
    else {
      if (foundUser) res.render("secrets", {usersWithS: foundUser});
    }
  });
});

app.get("/submit", function(req, res) {
  if (req.isAuthenticated()) res.render("submit");
  else res.redirect("/login");
});

app.get("/logout", function(req, res) {
  //de-authenticate
  req.logout();
  res.redirect("/");
});


//storing email and password -> user database

// //salt + hash
// app.post("/register", function(req, res) {
//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //<- store this hash
//     // Store hash in the password DB.
//     const newUser = new User({
//       email: req.body.username, //correponding to 14 and 18 of register.ejs
//       password: hash
//     });
//
//     newUser.save(function(err) {
//       if (err) res.render(err);
//       else res.render("secrets");
//     });
//   });
// });
//
// //check for credentials
// app.post("/login", function(req, res) {
//
//   const username = req.body.username;
//   const password = req.body.password; //this is plaintext entered by user
//
//   User.findOne({
//     email: username
//   }, function(err, foundUser) {
//     if (err) console.log(err);
//     else {
//       if (foundUser) {
//         bcrypt.compare(password, foundUser.password, function(err, result) {
//           // result == true
//           if (err) console.log(err);
//           else {
//             if (result) res.render("secrets");
//           }
//         });
//       }
//     }
//   });
// });


//cookies + sessions
app.post("/register", function(req, res) {
  User.register({ username: req.body.username}, req.body.password, function(err, user) { //callback err / new registered user
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});


// app.post("/login", function(req, res) {
//
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//
//   req.login(user, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function() {
//         res.redirect("/secrets");
//       });
//     }
//   });
// });

app.post("/login", function(req, res){
  //check the DB to see if the username that was used to login exists in the DB
  User.findOne({username: req.body.username}, function(err, foundUser){
    //if username is found in the database, create an object called "user" that will store the username and password
    //that was used to login
    if(foundUser){
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
      //use the "user" object that was just created to check against the username and password in the database
      //in this case below, "user" will either return a "false" boolean value if it doesn't match, or it will
      //return the user found in the database
      passport.authenticate("local", function(err, user){
        if(err){
          console.log(err);
        } else {
          //this is the "user" returned from the passport.authenticate callback, which will be either
          //a false boolean value if no it didn't match the username and password or
          //a the user that was found, which would make it a truthy statement
          if(user){
            //if true, then log the user in, else redirect to login page
            req.login(user, function(err){ //this function comes from passport
            res.redirect("/secrets");
            });
          } else {
            res.redirect("/login");
          }
        }
      })(req, res);
    //if no username is found at all, redirect to login page.
    } else {
      //user does not exists
      res.redirect("/login")
    }
  });
});


app.post("/submit", function(req, res) {
  const submittedSecret = req.body.secret;
  const id = req.user._id;
  User.findById(id, function(err, foundUser) {
    if (err) console.log(err);
    else {
      if (foundUser) foundUser.secret = submittedSecret;
      foundUser.save(function(){
        res.redirect("/secrets");
      });
    }
  });

});

app.listen(3000, function(req, res) {
  console.log("Server started on port 30000.");
})
