const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bakeryDB', {useNewUrlParser: true});
const bakerySchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});
// const Bakery = mongoose.model("Bakery", bakerySchema);
// const bakery = new Bakery({
//   name: "Bagel",
//   rating: 8,
//   review: "Good but might be too hard to chew",
// });
// bakery.save();

// mongoose.connect('mongodb://localhost:27017/personDB', {useNewUrlParser: true});
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
//
// const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "John",
//   age: 37
// });
// person.save();


const Bakery = mongoose.model("Bakery", bakerySchema);
const pretzel = new Bakery({
  name: "Pretzel",
  rating: 8,
  review: "A little expensive",
});
const croissant = new Bakery({
  name: "Croissant",
  rating: 8,
  review: "It's all about layers.",
});
const cookie = new Bakery({
  name: "Cookie",
  rating: 7,
  review: "Only fall for the soft ones",
});

Bakery.insertMany([pretzel, croissant, cookie], function(err) {
  if (err) console.log(err);
  else console.log("Success!");
})
