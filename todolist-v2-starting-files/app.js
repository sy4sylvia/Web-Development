//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//create a new database
//mongoDB atlas
mongoose.connect("mongodb+srv://sy4sylvia:200018Gsy@cluster0.jdjbg.mongodb.net/toDoListDB", {
  useNewUrlParser: true
});

//in the terminal
//mongosh "mongodb+srv://cluster0.jdjbg.mongodb.net/toDoListDB" --apiVersion 1 --username sy4sylvia

// mongoose.connect("mongodb://localhost:27017/toDoListDB", {
//   useNewUrlParser: true
// });
//create a new item schema
const itemsSchema = { name: String};

//create a new mongoose model -> capitalized
const Item = mongoose.model("Item", itemsSchema);

//mongoose document
const item1 = new Item({
  name: "Chicken with Chestnut"
});
const item2 = new Item({
  name: "Chicken with Taro"
});
const item3 = new Item({
  name: "Chicken with Mushrooms"
});

const defaultItems = [item1, item2, item3];

// another new document
const listSchema = {
  name: String,
  items: [itemsSchema]
};
//mongoose model
const List = mongoose.model("List", listSchema); //new collection called list>


app.get("/", function(req, res) {
  const day = date.getDate();

  Item.find({}, function(err, foundItems) { //find method gives the result of arrays
    if (foundItems.length === 0) { //insert default only if empty
      Item.insertMany(defaultItems, function(err) {
        if (err) console.log(err);
        else console.log("Successfully saved default items to the database.");
      });
      res.redirect("/");
    }
    else {
      res.render("list", {
        listTitle: day,
        newListItems: foundItems
      });
    }
  });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

    //find the list collection
    //condition: name: customListName -> find it (meaning already exists)
    //foudList is here the result
  List.findOne({name: customListName}, function(err, foundList) {
    if (err) console.log(err);
    else {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems //reuse default items
        });
        list.save();
        res.redirect("/" + customListName);
      }
      else {
        console.log("The list already exists.");
        //then render corresponding page
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});


app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list; //corresponds to the name of the button
  //create a new document
  const item = new Item({
    name: itemName
  });

  if (listName != date.getDate()) {
    List.findOne({name: listName}, function (err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName); //not customListName here
    });
  }
  else {
    item.save(); //mongoose shortcut
    res.redirect("/");
  }
});

app.post("/delete", function(req, res) {
  const checkedId = req.body.checkbox;
  const listName = req.body.listName;

  //decide which route we're on
  if (listName != date.getDate()) {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedId}}}, function(err, foundList) {
      if (err) console.log(err);
      else {
        console.log("Successfully deleted!");
        res.redirect("/" + listName);
      }
    });
  }
  else {
    //then remove the checked item from database
    Item.findByIdAndRemove(checkedId, function(err) {
      if (err) console.log(err);
      else {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  }
});

app.get("/about", function(req, res) {
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started.");
});
