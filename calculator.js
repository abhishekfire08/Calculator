class Calculator {
    constructor(displayElement) {
      this.displayElement = displayElement;
      this.clear();
    }

    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
      this.updateDisplay();
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
      this.updateDisplay();
    }

    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          if (current === 0) {
            computation = "Error";
          } else {
            computation = prev / current;
          }
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
      this.updateDisplay();
    }

    updateDisplay() {
      this.displayElement.innerText = this.currentOperand;
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const calculator = new Calculator(display);

    const numberButtons = document.querySelectorAll('.digit');
    const operationButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.operator:last-child');
    const clearButton = document.querySelector('.clear');

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(button.innerText === '=') {
                calculator.compute();
            } else {
                calculator.chooseOperation(button.innerText);
            }
        });
    });

    clearButton.addEventListener('click', button => {
        calculator.clear();
    });

    document.addEventListener('keydown', (event) => {
        let patternForNumbers = /[0-9]/g;
        let patternForOperators = /[+\-*\/]/g
        if (event.key.match(patternForNumbers)) {
          event.preventDefault();
          calculator.appendNumber(event.key)
        }
        if (event.key === '.') {
          event.preventDefault();
          calculator.appendNumber(event.key)
        }
        if (event.key.match(patternForOperators)) {
          event.preventDefault();
          calculator.chooseOperation(event.key)
        }
        if (event.key === 'Enter' || event.key === '=') {
          event.preventDefault();
          calculator.compute()
        }
        if (event.key === "Backspace") {
          event.preventDefault();
          calculator.clear();
        }
        if (event.key == 'c' || event.key == 'C') {
          event.preventDefault();
          calculator.clear();
        }

      });
});
