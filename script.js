document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    const updateDisplay = () => {
        display.innerText = currentOperand;
    };

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    };

    const chooseOperation = (op) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
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
                    computation = 'Error';
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    };

    const clear = () => {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
    };

    buttons.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;

            if (!action) {
                appendNumber(keyContent);
                updateDisplay();
            }
            if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                chooseOperation(keyContent);
            }
            if (action === 'decimal') {
                appendNumber('.');
                updateDisplay();
            }
            if (action === 'clear') {
                clear();
                updateDisplay();
            }
            if (action === 'calculate') {
                compute();
                updateDisplay();
            }
        }
    });
});
