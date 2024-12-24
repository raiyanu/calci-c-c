import CalciHistory from "./history.js";
export default class Calculator {
    constructor(input = []) {
        this.input = input;
        this.history = new CalciHistory();
    }

    evaluate(fixed) {
        if (!this.input.some(item => ["-", "+", "/", "*"].includes(item))) {
            console.log("Doesnt contain any single operation to begin perform");
            return
        }

        if (["-", "+", "/", "*"].includes(this.input.at(-1))) {
            console.log("ignoring...");
            return;
        }
        this.fixed = fixed ? fixed : 0;
        console.log(fixed);

        let nums = [];
        let ops = [];

        const applyOperator = () => {
            const b = nums.pop();
            const a = nums.pop();
            const operator = ops.pop();
            let result = 0;

            if (operator === "+") {
                result = (a + b).toFixed(this.fixed);
            } else if (operator === "-") {
                result = (a - b).toFixed(this.fixed);
            } else if (operator === "*") {
                result = (a * b).toFixed(this.fixed);
            } else if (operator === "/") {
                if (b === 0) {
                    console.log("cannot divide value by 0");
                    alert("cannot divide value by 0");
                    return;
                }
                result = (a / b).toFixed(this.fixed);
            }

            nums.push(parseFloat(result));
        };

        const precedence = (op) => {
            if (op === "+" || op === "-") return 1;
            if (op === "*" || op === "/") return 2;
            return 0;
        };

        let processedInput = [];
        for (let i = 0; i < this.input.length; i++) {
            const token = this.input[i];

            if ((token === "-" || token === "+") && (i === 0 || ["+", "-", "*", "/"].includes(this.input[i - 1]))) {
                if (typeof this.input[i + 1] === "number") {
                    processedInput.push(token + this.input[i + 1]);
                    i++;
                }
            } else {
                processedInput.push(token);
            }
        }

        console.log("Processed Input: ", processedInput);

        let i = 0;
        while (i < processedInput.length) {
            const token = processedInput[i];

            if (typeof token === "number" || !isNaN(parseFloat(token))) {
                nums.push(parseFloat(token));
            } else if (token === "(") {
                ops.push(token);
            } else if (token === ")") {
                while (ops[ops.length - 1] !== "(") {
                    applyOperator();
                }
            } else {
                while (
                    ops.length &&
                    precedence(ops[ops.length - 1]) >= precedence(token)
                ) {
                    applyOperator();
                }
                ops.push(token);
            }
            i++;
        }

        while (ops.length) {
            applyOperator();
        }

        let result = nums[0];
        console.log("this input ", this.input);
        this.history.addHistory({ operation: this.input.join(" "), result });
        this.input = [];
        return result.toFixed(fixed);
    }

    addInput(i) {
        console.log("value i : ", i);

        console.log(this.input);
        console.log(this.input[this.input.length - 1]);
        if (["-", "+", "/", "*"].includes(i)) {
            if (["-", "+", "/", "*"].includes(this.input[this.input.length - 1])) {
                this.input.pop();
            }
        } else if (this.isValidNumber(i)) {
            if (this.isValidNumber(this.input[this.input.length - 1])) {
                this.input.pop();
            }
        }
        this.input.push(i);
        document.getElementById("support_section").innerText = this.input.join(" ");
    }

    resetAll() {
        this.input = [];
        document.getElementById("support_section").innerText = "";
        console.log("cleared");
    }

    resetHistory() {
        this.history.clearHistory();
    }

    isValidNumber(i) {
        const regex = /^-?\d+(\.\d+)?$/;
        return regex.test(i);
    }
}
