let display = document.querySelector('.display');
let previousOperator = null;
let previousOperand = null;

function appendDigit(digit) {
  display.textContent += digit;
}

function appendOperator(operator) {
  if (previousOperator) {
    calculate();
  }
  previousOperator = operator;
  previousOperand = parseFloat(display.textContent);
  display.textContent += operator;
}

function calculate() {
  let currentOperand = parseFloat(display.textContent.split(previousOperator)[1]);
  let result;

  switch (previousOperator) {
    case '+':
      result = previousOperand + currentOperand;
      break;
    case '-':
      result = previousOperand - currentOperand;
      break;
    case '*':
      result = previousOperand * currentOperand;
      break;
    case '/':
      if (currentOperand === 0) {
        result = "Error";
      } else {
        result = previousOperand / currentOperand;
      }
      break;
  }

  display.textContent = result;
  previousOperator = null;
  previousOperand = null;
}

function clearDisplay() {
  display.textContent = '';
}