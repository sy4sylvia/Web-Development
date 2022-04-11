const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//mongoDB setup
//a new database
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//collection -> articles (in the form of plural)
//corresponding schema -> article

//a new schema
const articleSchema = {
  title: String,
  content: String
};

//create a new mongoose model -> capitalized
//mongoose automaticalky changes Article to articles (name of the collection)
const Article = mongoose.model("Article", articleSchema);

//get post...
app.get("/articles", function(req, res) {
  //database part -> read
  //want to fetch all the articles -> {} leave the condtion empty
  Article.find({}, function(err, foundArticles){
    if (!err) res.send(foundArticles);
    else res.send(err);
  });
});

app.post("/articles", function(req, res) {
  // console.log(req.body.title);
  // console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (err) console.log(err);
    else console.log("Added another article successfully.");
  });
});


app.delete("/articles", function(req, res) {

});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
