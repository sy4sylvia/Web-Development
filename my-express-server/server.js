const express = require("express");
const app = express(); //a function that represents express module

app.get("/", function(req, res) { // first para means route that we want to repond to, home route
  //call back function
  res.send("<h1>Hello, world</h1>");
});

app.get("/contact", function(req, res) { // a new route
  res.send("Contact me @: sg6803@nyu.edu");
});

app.get("/bio", function(req, res) {
  res.send("About me: Grad student @NYU, major in Computer Engineering");
});

app.get("/hobbies", function(req, res) {
  res.send("I love brewing coffee☕️");
});

app.listen(3000, function() {
  console.log("server started");
}); //listen to specific port on the server
