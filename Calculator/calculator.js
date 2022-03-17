const express = require("express");
const bodyParser = require("body-parser"); //incorporate the package
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
//body parser have serveral modes: text, json, urlencoded...
//urlencoded parse data that comes from html forms

app.get("/", function(req, res) {
  // res.send("<h1>Hello, world!</h1>");
  res.sendFile(__dirname + "/index.html"); //__dirname givese the file path of current file
});

//handle post request
app.post("/", function(req, res) {
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);
  var sum = n1 + n2;
  res.send("The result of calculation is " + sum);
});

//adding get and post methods for BMI calculator
app.get("/bmiCalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});
app.post("/bmiCalculator", function(req, res) {
  var w = parseFloat(req.body.weight);
  var h = parseFloat(req.body.height);
  var bmiRes = w / (h * h);
  res.send("Your BMI is " + bmiRes);
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
