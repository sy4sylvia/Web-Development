const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //specify static resource

let items = ["Meal prep", "Bagel + Salmon for Saturday"];
let workItems = [];

app.get("/",function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day = today.toLocaleString("en-US", options);
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res) { //work route for the work to do list
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about"); //takes no parameters
})

app.post("/", function(req, res) {
  if (req.body.list === "Work") { //mainly that after adding an item, doesn't redirect to  home page
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }
  else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function(req, res) {
  console.log("Server listening on port 3000");
});
