/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
// Add Numbers -----------------------------------------------------------------
function add(add1, add2){
    let sum = add1 + add2
    return sum
}
const buttonElement = document.getElementById("addNumbers");

function addNumbers(){
    const add1 = parseFloat(document.getElementById("add1").value);
    const add2 = parseFloat(document.getElementById("add2").value);
    let sum = add(add1, add2)

    document.getElementById("sum").value = sum;
}
buttonElement.addEventListener("click", addNumbers);



/* Function Expression - Subtract Numbers */
const subtract = function(subtract1, subtract2) {
    let subtractNums = subtract1 - subtract2;
    return subtractNums;
};
const subtractButtonElement = document.getElementById("subtractNumbers");

const subtractNumbers = function() {
    const subtract1 = parseFloat(document.getElementById("subtract1").value);
    const subtract2 = parseFloat(document.getElementById("subtract2").value);
    let subtractNums = subtract(subtract1, subtract2);

    document.getElementById("difference").value = subtractNums;
};
subtractButtonElement.addEventListener("click", subtractNumbers);




/* Arrow Function - Multiply Numbers */
const multiply = (factor1, factor2) => factor1 * factor2

const multiplyButtonElement = document.getElementById("multiplyNumbers");

function multiplyNumbers(){
    const multiply1 = parseFloat(document.getElementById("factor1").value);
    const multiply2 = parseFloat(document.getElementById("factor2").value);
    let multiplyNums = multiply(multiply1, multiply2)

    document.getElementById("product").value = multiplyNums;
}
multiplyButtonElement.addEventListener("click", multiplyNumbers);



/* Open Function Use - Divide Numbers */
const divide = (dividend, divisor) => {
    return dividend / divisor
}
const divideButtonElement = document.getElementById("divideNumbers");

function divideNumbers(){
    const divide1 = parseFloat(document.getElementById("dividend").value);
    const divide2 = parseFloat(document.getElementById("divisor").value);
    let divideNums = divide(divide1, divide2)

    document.getElementById("quotient").value = divideNums;
}
divideButtonElement.addEventListener("click", divideNumbers);



/* Decision Structure */
function findElementById(id) {
    return document.getElementById(id);
  }
  
  const getTotalButton = findElementById("getTotal");
  const totalSpan = findElementById("total");
  
  function calculateTotal(subtotal, isMember) {
    if (isMember) {
      return subtotal * 0.85;
    } else {
      return subtotal;
    }
  }
  
  getTotalButton.addEventListener("click", () => {
    const subtotal = parseFloat(findElementById("subtotal").value);
    const isMember = findElementById("member").checked;

    const total = calculateTotal(subtotal, isMember);
    totalSpan.textContent = `$${total.toFixed(2)}`;
  });
  



/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let arrayNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
];
document.getElementById("array").innerHTML = arrayNumbers;


/* Output Odds Only Array */
let oddNumbers = arrayNumbers.filter(number => number % 2 !== 0);
document.getElementById("odds").innerHTML = oddNumbers;


/* Output Evens Only Array */
let evenNumbers = arrayNumbers.filter(number => number % 2 === 0);
document.getElementById("evens").innerHTML = evenNumbers;


/* Output Sum of Org. Array */
let sumArray = arrayNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
document.getElementById("sumOfArray").innerHTML = sumArray;


/* Output Multiplied by 2 Array */
let mapNumbers = arrayNumbers.map(number => number * 2);
document.getElementById("multiplied").innerHTML = mapNumbers;


/* Output Sum of Multiplied by 2 Array */
let multiplyNums = arrayNumbers.map(number => number * 2);
let sumNums = multiplyNums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
document.getElementById("sumOfMultiplied").innerHTML = sumNums;


