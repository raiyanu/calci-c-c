
import Calculator from "./utils/CalculateArray.js";
const calculator = new Calculator();


let numberField = document.getElementById("numberField"),
    fix = 2;


const numpadHit = (InputNumber) => {
    let val = numberField.value;
    if (numberField.value.slice(-2) === ".0") {
        val = val.substring(0, val.length - 1);
        val = val.concat(InputNumber);
    } else if (InputNumber === ".") {
        if (!numberField.value.includes(".")) {
            val = val + ".0";
        }
    } else {
        val = numberField.value.concat(InputNumber);
    }
    numberField.value = val;
};

const OperatorHit = (operator) => {
    if (!numberField.value == "") {
        calculator.addInput(parseFloat(numberField.value))
    }
    calculator.addInput(operator)
    numberField.value = "";
};

const EQUALS = () => {
    console.log("= Clicked");
    console.log(calculator.input);
    if (!numberField.value == "") {
        calculator.addInput(parseFloat(numberField.value))
    }
    const result = calculator.evaluate(fix);
    console.log("result : ", result);
    if (result) {
        numberField.value = result;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const numpadButtons = document.querySelectorAll('.numpad-button');
    // NumericPad button Hit
    numpadButtons.forEach(buttonElement => {
        buttonElement.addEventListener('click', () => {
            numpadHit(buttonElement.getAttribute('data-value'));
        });
    });
    // Action buttons and Operater
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(buttonElement => {
        const action = buttonElement.getAttribute('data-action');
        if (action === 'del') {
            buttonElement.addEventListener('click', Del);
        } else if (action === '=') {
            buttonElement.addEventListener('click', () => {
                EQUALS();
            });
        } else if (action === "reset") {
            buttonElement.addEventListener('click', () => {
                calculator.resetAll();
                numberField.value = ""
            });
        } else {
            buttonElement.addEventListener('click', () => {
                OperatorHit(action);
            });
        }
    });
    const fixedButtons = document.querySelectorAll('.fixed-action');

    fixedButtons.forEach(buttonElement => {
        const fixedValue = buttonElement.getAttribute('data-action-fixed');
        buttonElement.addEventListener('click', () => {
            switchFix(buttonElement)
        })
    });

    document.getElementById('clearHistoryButton').addEventListener('click', () => {
        calculator.resetHistory();
        console.log("clear history");

    });
});

const switchFix = (buttonElement) => {
    const fixedValue = buttonElement.getAttribute('data-action-fixed');
    fix = fixedValue;
    document.querySelectorAll('.fixed-action').forEach(buttonElement => {
        buttonElement.classList.remove('active');
    })
    buttonElement.classList.add('active');
}


function Del() {
    if (numberField.value.length <= 0) {
        return;
    }
    let inputNumberVal = numberField.value;
    if (numberField.value.slice(-2).charAt(0) === ".") {
        if (inputNumberVal.length > 0) {
            numberField.value = inputNumberVal.slice(0, -2);
        } else {
            numberField = "";
        }
    } else {
        if (inputNumberVal.length > 0) {
            numberField.value = inputNumberVal.slice(0, -1);
        } else {
            numberField = "";
        }
    }
}
