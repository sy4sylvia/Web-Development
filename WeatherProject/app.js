const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  res.send("Server is up and running.");
  const url = "https://api.openweathermap.org/data/2.5/weather?q=New York&appid=911b21a31f053537d5629099b58ef4c9&units=metric";
  https.get(url, function(response) {
    console.log(response);
  });
});





app.listen(3000, function() {
  console.log("Server running on port 3000....");
});
