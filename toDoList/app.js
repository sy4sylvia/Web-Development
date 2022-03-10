const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");


app.get("/", function(req, res) {
  var today = new Date();
  var curDay = today.getDay();
  var day = "";

  switch(curDay) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
      console.log("Error");
}

  res.render("list", {dayType: day}); //key value pair

  // res.send();


});

app.listen(3000, function() {
  console.log("Server listening on port 3000...");
})
