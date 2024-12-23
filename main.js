const numberInput = document.getElementById("numberField");
let prevNum,
    ops = "", isSolved = false;

function numpadHit(terms) {
    if (isSolved === true) {
        numberInput.value = '';
        isSolved = false
    }
    console.log(`
        prevNum : ${prevNum},
        ops : ${ops},
        terms : ${terms},
        `);
    if (
        terms === "ADDITION" ||
        terms === "SUBTRACTION" ||
        terms === "MULTIPLICATION" ||
        terms === "DIVISON"
    ) {
        if (ops === "") {
            console.log('terms: ', terms);
            ops = terms;
            console.log('ops: ', ops);
            prevNum = parseInt(numberInput.value);
            console.log('prevNum: ', prevNum);
            numberInput.value = ""
        } else {
            let result = operate();
            prevNum = result;
            numberInput.value = "";
        }

    } else if (terms === "DELETE") {
        numberInput.value = ""
    } else if (terms === "RESET") {
        ops = "";
        prevNum = 0;
        numberInput.value = ""
    } else if (terms === "EQUALS") {
        let result = operate();
        if (result === "ERROR") {
            alert('Please specify value!')
        } else {
            numberInput.value = result;
            ops = ""
        }
        isSolved = true;
    } else {
        numberInput.value = numberInput.value.concat(terms);
    }
}

const operate = () => {
    let op1 = parseInt(numberInput.value),
        op2 = parseInt(prevNum);
    console.log('op1: ', op1);
    console.log('op2: ', op2);
    if (ops === "ADDITION") return op2 + op1;
    if (ops === "SUBTRACTION") return op2 - op1;
    if (ops === "MULTIPLICATION") return op2 * op1;
    if (ops === "DIVISON") return op2 / op1;
    else return "ERROR"
}