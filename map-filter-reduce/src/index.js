import emojipedia from "./emojipedia";

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.


const n = numbers.map(
    function double(x) {
        return (x * 2);
    }
);
console.log(n);


//Filter - Create a new array by keeping the items that return true.

const newN = numbers.filter(
    function (num) {
        return num > 10;
    }

);
console.log(newN);


//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = 0;
// numbers.forEach(
//     function reduce(curN) {
//         newNumber += curN;
//     }
// );

const reduceEg = numbers.reduce ( //sum up the array
    function (accumulator, curN) {
        return accumulator + curN;
    }
);
console.log(reduceEg);

//Find - find the first item that matches from an array.

const firstN = numbers.find(
    function(num) {
        return num >= 10;
    }
);
console.log(firstN);

//FindIndex - find the index of the first item that matches.
const firstIdx = numbers.findIndex(
    function(num) {
        return num >= 10;
    }
);
console.log(firstIdx);

//a maximus of 100 characters for the meaning of emojis(create an array)

const desc = emojipedia.map(
    function (emojiEntry) {
        return (emojiEntry.meaning.substring(0, 100));
    }
);

console.log(desc);