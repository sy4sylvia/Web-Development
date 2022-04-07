//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//create a new database
mongoose.connect("mongodb://localhost:27017/toDoListDB",{useNewUrlParser: true});
//create a new item schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check for the name entry"]
  }
});

//create a new mongoose model -> capitalized
const Item = mongoose.model("Item", itemsSchema);

//mongoose document
const item1 = new Item({
  name: "Buy Food"
});
const item2 = new Item({
  name: "Cook Food"
});
const item3 = new Item({
  name: "Eat Food"
});

const defaultItems = [item1, item2, item3];


app.get("/", function(req, res) {
  const day = date.getDate();
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) { //insert default only if empty
      Item.insertMany(defaultItems, function(err) {
        if (err) console.log(err);
        else console.log("Success!");
      });
      res.redirect("/");
    } else res.render("list", {listTitle: day, newListItems: foundItems});
  });
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
