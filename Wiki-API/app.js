const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//mongoDB setup
//a new database
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

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

//chaining
app.route("/articles")
.get(function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if (!err) res.send(foundArticles);
    else res.send(err);
  });
})
.post(function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if (err) console.log(err);
    else console.log("Added another article successfully.");
  });
})
.delete(function(req, res) { //delete all -> no condition
  Article.deleteMany(function(err) {
    if (err) res.send(err);
    else res.send("Deleted all articles");
  });
});

//specific article
app.route("/articles/:articleTitle")
.get(function(req, res) {
  //route parameters
  const routePara = req.params.articleTitle; //localhost:3000/articles/xxx
  Article.findOne({title: routePara}, function(err, foundArticle) { //only expecting a single match
    if (!err) {
      if (!foundArticle) res.send("No articles found.");
      else res.send(foundArticle);
    }
    else res.send(err);
  });
})
.put(function(req, res) {
  //replace -> update in CRUD
  Article.replaceOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content}, //replace with new title and content
    function(err) {
      if (err) res.send(err);
      else res.send("Updated article (both title and content).")
  });
})
.patch(function(req, res) {
  Article.findOneAndUpdate(
    {title: req.params.articleTitle}, //condition
    {$set: req.body},
    function(err) {
      if (err) res.send(err);
      else res.send("Updated article partially.")
  });
});
// .post(function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   newArticle.save(function(err) {
//     if (err) console.log(err);
//     else console.log("Added another article successfully.");
//   });
// })
// .delete(function(req, res) { //delete all -> no condition
//   Article.deleteMany(function(err) {
//     if (err) res.send(err);
//     else res.send("Deleted all articles");
//   });
// });


//get post...
// app.get("/articles", function(req, res) {
//   //database part -> read
//   //want to fetch all the articles -> {} leave the condtion empty
//   Article.find({}, function(err, foundArticles) {
//     if (!err) res.send(foundArticles);
//     else res.send(err);
//   });
// });
//
// app.post("/articles", function(req, res) {
//   // console.log(req.body.title);
//   // console.log(req.body.content);
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   newArticle.save(function(err) {
//     if (err) console.log(err);
//     else console.log("Added another article successfully.");
//   });
// });
//
//
// app.delete("/articles", function(req, res) { //delete all -> no condition
//   Article.deleteMany(function(err) {
//     if (err) res.send(err);
//     else res.send("Deleted all articles");
//   });
// });

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
