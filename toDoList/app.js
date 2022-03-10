const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = ["Meal prep", "Data  Structures"];

app.get("/",function(req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  var day = today.toLocaleString("en-US", options);

  res.render("list", {
    dayType: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(3000, function(req, res) {
  console.log("Server listening on port 3000");
});
