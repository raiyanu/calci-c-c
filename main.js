const history = window.calciHistory();

let prevNum = 0,
    ops = "+",
    numberField = document.getElementById("numberField"),
    fix = 0,
    historyTabElement = document.getElementById("historyTabElement");

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

function EQUALS() {
    let historyItem = {};
    historyItem.operand1 = prevNum;
    historyItem.operand2 = numberField.value;
    let result = operate().toFixed(fix);
    historyItem.result = result;
    historyItem.operatorSymbol = ops;
    console.log(historyItem);
    if (result === "ERROR") {
        alert("ERROR");
    } else {
        numberField.value = result;
    }
    ops = "";
    console.log(history);
    history.addHistory(historyItem);
    historyTabElement.appendChild(
        createHistoryListElement(historyItem)
    );
    historyTabElement.scrollBy(0, 10000)
}
const Operator = (operator) => {
    if (!ops === "") {
        let result = operate().toFixed(fix);
        if (result === "ERROR") {
            alert("ERROR");
        } else {
            prevNum = result;
        }
        numberField.value = "";
    } else {
        prevNum = parseFloat(numberField.value);
        ops = operator;
        numberField.value = "";
    }
};

const operate = () => {
    let op1 = parseFloat(numberField.value),
        op2 = parseFloat(prevNum);
    if (ops === "+") return op2 + op1;
    if (ops === "-") return op2 - op1;
    if (ops === "*") return op2 * op1;
    if (ops === "/") return op2 / op1;
    else return "ERROR";
};

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

window.addEventListener("DOMContentLoaded", () => {
    history.history.forEach((e) => {
        historyTabElement.appendChild(
            createHistoryListElement({
                operand1: e[0],
                operand2: e[2],
                operatorSymbol: e[1],
                result: e[3],
            })
        );
    });
    historyTabElement.scrollBy(0, 10000);
});

function createHistoryListElement({
    operand1,
    operand2,
    operatorSymbol,
    result,
}) {
    let customElement = document.createElement("div");
    customElement.innerHTML = `${operand1} ${operatorSymbol} ${operand2} <hr> ${result}`;
    return customElement;
}


