import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

var numbers = [3, 56, 2, 48, 5];

////Map -Create a new array by doing something with each item in an array.
const mapped = numbers.map(x => x * x);
console.log(mapped);

//////Filter - Create a new array by keeping the items that return true.
const filtered = numbers.filter(x => x < 10);
console.log(filtered);
//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = numbers.reduce(function (accumulator, currentNumber) {
//     return accumulator + currentNumber;
// })
var sum = numbers.reduce((x, y) => x + y);
console.log(sum);

////Find - find the first item that matches from an array.
// const newNumber = numbers.find(function (num) {
//   return num > 10;
// })
const firstN = numbers.find(x => x > 10);
console.log(firstN);

////FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex(function (num) {
//   return num > 10;
// })
const firstIdx = numbers.findIndex(x => x > 10);
console.log(firstIdx);

