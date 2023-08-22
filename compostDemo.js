const { compose } = require("redux");

function removeSpaces(str) {
  return str.split(" ").join("");
}

function repeatString(str){
    return str.repeat(3)
}

function convertToUpper(str){
    return str.toUpperCase()
}
// console.log(removeSpaces('dkfjd fjdkfjd kdjfkdf '))
// console.log(repeatString('Ramesh '))
// console.log(convertToUpper('Ramesh '))


const composedMethod= compose(removeSpaces, repeatString, convertToUpper)

console.log(composedMethod('Ramesh Singh'))