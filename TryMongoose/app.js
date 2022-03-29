const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/bakeryDB', {useNewUrlParser: true});
// const bakerySchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   review: String
// });
// const Bakery = mongoose.model("Bakery", bakerySchema);
// const bakery = new Bakery({
//   name: "Bagel",
//   rating: 8,
//   review: "Good but might be too hard to chew",
// });
// bakery.save();

mongoose.connect('mongodb://localhost:27017/personDB', {useNewUrlParser: true});
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 37
});
person.save();
