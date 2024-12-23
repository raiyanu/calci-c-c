const numberInput = document.getElementById("numberField");
let prevNum = 0,
    ops = "";

console.log(`
        prevNum : ${prevNum},
        ops : ${ops},
        `);

function numpadHit(terms) {
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
        if (ops === "EQUALS") {
            prevNum = parseFloat(numberInput.value);
            numberInput.value = '';
        }
        if (ops === "") {
            ops = terms;
            prevNum = parseFloat(numberInput.value);
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
        numberInput.value = "";
    } else if (terms === "EQUALS") {
        let result = operate();
        if (result === "ERROR") {
            alert('Please specify value!')
        } else {
            numberInput.value = result;
            prevNum = result;
            ops = "EQUALS";
        }
    } else {
        numberInput.value = numberInput.value.concat(terms);
    }
    console.log(`
        CURRENT!
        prevNum : ${prevNum},
        ops : ${ops},
        terms : ${terms},
        `);
}

const operate = () => {
    let op1 = parseFloat(numberInput.value),
        op2 = parseFloat(prevNum);
    if (ops === "ADDITION") return op2 + op1;
    if (ops === "SUBTRACTION") return op2 - op1;
    if (ops === "MULTIPLICATION") return op2 * op1;
    if (ops === "DIVISON") return op2 / op1;
    else return "ERROR"
}