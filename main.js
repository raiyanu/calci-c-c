let prevNum = 0,
    ops = "ADDITION",
    numberField = document.getElementById("numberField"), fix = 0;

const numpadHit = (InputNumber) => {
    let val = numberField.value;
    if (numberField.value.slice(-2) === '.0') {
        val = val.substring(0, val.length - 1);
        val = val.concat(InputNumber);
    } else if (InputNumber === '.') {
        if (!numberField.value.includes('.')) {
            val = val + '.0';
        }
    } else {
        val = numberField.value.concat(InputNumber);
    }

    numberField.value = val;
};

function EQUALS() {
    let result = operate().toFixed(fix);
    if (result === "ERROR") {
        alert("ERROR");
    } else {
        numberField.value = result;
    }
    ops = '';
}
const Operator = (operator) => {
    if (!ops === '') {
        let result = operate().toFixed(fix);
        if (result === "ERROR") {
            alert("ERROR");
        } else {
            prevNum = result;
        }
        numberField.value = "";
    }
    else {
        prevNum = parseFloat(numberField.value);
        ops = operator;
        numberField.value = "";
    }
};

const operate = () => {
    let op1 = parseFloat(numberField.value),
        op2 = parseFloat(prevNum);
    if (ops === "ADDITION") return op2 + op1;
    if (ops === "SUBTRACTION") return op2 - op1;
    if (ops === "MULTIPLICATION") return op2 * op1;
    if (ops === "DIVISON") return op2 / op1;
    else return "ERROR";
};


function Del() {
    if (numberField.value.length <= 0) {
        return;
    }
    let inputNumberVal = numberField.value;
    if (numberField.value.slice(-2).charAt(0) === '.') {
        if (inputNumberVal.length > 0) {
            numberField.value = inputNumberVal.slice(0, -2);
        } else {
            numberField = ''
        }
    } else {
        if (inputNumberVal.length > 0) {
            numberField.value = inputNumberVal.slice(0, -1);
        } else {
            numberField = ''
        }
    }
}