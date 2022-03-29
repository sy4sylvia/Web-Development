const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
const bakerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check for the name entry"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10 //validation -> fatal error
  },
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
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favBakery: [bakerySchema] //embedded
});

const Person = mongoose.model("Person", personSchema);
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

// Bakery.insertMany([pretzel, croissant, cookie], function(err) {
//   if (err) console.log(err);
//   else console.log("Success!");
// });
const brioche = new Bakery({
  name: "Brioche",
  rating: 8,
  review: "Never tried though",
});
// brioche.save();

// const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "Amy",
//   age: 7,
//   favBakery: brioche
// });
// person.save();

// Person.updateOne({name: "John"}, {$set : {favBakery: pretzel}}, function(err) {
//     if (err) console.log(err);
//     else console.log("Successfully updated John's favBakery!");
// })

Bakery.findOne({name: "Pretzel"}, function(err, bakery) {
  if (err) console.log("What the fuck");
  else {
    Person.updateOne({name: "John"}, {favBakery: bakery}, function(err) {
        if (err) console.log(err);
        else {
          mongoose.connection.close();
          console.log("Successfully updated John's favBakery!");
        }
    });
  }
});

Bakery.find(function(err, bakeries){  //array called bakeries
  if (err) console.log(err);
  else {
    // mongoose.connection.close();
    bakeries.forEach(b => console.log(b.name)); //log all results
    // people.forEach(p => console.log(p));
  }
});

// Bakery.updateOne({_id: "62431e40fe69d43a882533a7"}, {name: "Chocolate Cookie"}, function(err){
//   if (err) console.log(err);
//   else console.log("Successfully updated!");
// });

Bakery.deleteMany({name: "Bread"}, function(err){
  if (err) console.log(err);
  else console.log("Successfully deleted all duplicates that previously existed!");
});

//establish relationship between schemas
