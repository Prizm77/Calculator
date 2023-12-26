const displayNum = document.getElementById('displayNum');
const numKey = document.getElementsByClassName('key');
const btnArry = document.getElementById('btnArry');

displayNum.textContent = '0';
let numOne = 0;
let numTwo = 0;
let operation = '';
let awaitingSecondNumber = false;

const operate = function(a, b, op) {
    if (op === '+') {
        return a + b;
    }
    else if (op === '-') {
        return a - b;
    }
    else if (op === '/') {
        return a / b;
    }
    else if (op === 'x') {
        return a * b;
    }
};
// listen for clicks
btnArry.addEventListener('click', (event) => {
    if (event.target.id === 'keyAC' ) {
        displayNum.textContent = '0';
        numOne = '';
        numTwo = '';
        operation = '';
        awaitingSecondNumber = false;
    }
    else if (event.target.id === 'keyEquals' ) {
        displayNum.textContent = operate(numOne, numTwo, operation);
        numOne = parseFloat(displayNum.textContent);
        numTwo = '';
        operation = '';
        awaitingSecondNumber = false;

    }

    else if (event.target.classList.contains('key')) {
            runOper(event);
    }

});

function runOper(event) {
    const key = event.target.textContent;

    if (!isNaN(key)) {  // If the key is a number
        if (awaitingSecondNumber) {
            // Check if we're entering the first digit of numTwo
            if (numTwo === '') {
                displayNum.textContent = key; // Reset display for numTwo
            } else {
                displayNum.textContent += key;
            }
            numTwo += key;
        } 
        else {
            // Check if we're starting a new number or appending to numOne
            if (displayNum.textContent === '0' || numOne === 0) {
                displayNum.textContent = key; // Set display to key if it's the first digit
            } else {
                displayNum.textContent += key;
            }
            numOne = parseFloat(displayNum.textContent);
        }
    } 
    else if (key !== '=') {  // If the key is an operation (but not '=')
        if (!awaitingSecondNumber) {
            awaitingSecondNumber = true;
            operation = key;
        } else {
            // Perform the operation if we already have a first and second number
            numOne = operate(numOne, parseFloat(numTwo), operation);
            displayNum.textContent = numOne;
            numTwo = '';
            operation = key;
        }
    } 
    else { 
        // Perform the operation if it's set
        if (operation !== '') {
            displayNum.textContent = operate(numOne, parseFloat(numTwo), operation);
            numOne = parseFloat(displayNum.textContent);
            numTwo = '';
            operation = '';
            awaitingSecondNumber = false;
        }
    }
}

