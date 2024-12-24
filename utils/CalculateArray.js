import CalciHistory from "../history.js";

export default class Calculator {
    constructor(input = []) {
        this.input = input;
        this.history = new CalciHistory();
    }

    evaluate(fixed) {
        this.fixed = fixed ? fixed : 0;
        console.log(fixed);

        let nums = [];
        let ops = [];

        const applyOperator = () => {
            const b = nums.pop();
            const a = nums.pop();
            const operator = ops.pop();
            if (operator === '+') {
                nums.push(a + b).toFixed(fixed);
            } else if (operator === '-') {
                nums.push(a - b).toFixed(fixed);
            } else if (operator === '*') {
                nums.push(a * b).toFixed(fixed);
            } else if (operator === '/') {
                if (b === 0) {
                    console.log("cannot divide value by 0");
                    alert("cannot divide value by 0");
                }
                nums.push(a / b).toFixed(fixed);
            }
        };

        const precedence = (op) => {
            if (op === '+' || op === '-') return 1;
            if (op === '*' || op === '/') return 2;
            return 0;
        };

        let i = 0;
        while (i < this.input.length) {
            const token = this.input[i];

            if (typeof token === 'number') {
                nums.push(token);
            } else if (token === '(') {
                ops.push(token);
            } else if (token === ')') {
                while (ops[ops.length - 1] !== '(') {
                    applyOperator();
                }
            } else {
                while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                    applyOperator();
                }
                ops.push(token);
            }
            i++;
        }

        while (ops.length) {
            applyOperator();
        }
        let result = nums[0].toFixed(fixed)
        console.log("this input ", this.input)
        this.history.addHistory({ operation: this.input.join(" "), result })
        this.input = []
        return result;
    }

    addInput(i) {
        console.log(this.input);
        console.log(this.input[this.input.length - 1]);
        if (!["-", "+", "/", "*"].includes(this.input[this.input.length - 1])) {
            if (this.isValidNumber(i)) {
                this.input.pop();
            };
        }
        this.input.push(i);
        document.getElementById('support_section').innerText = this.input.join(" ");
    }
    resetAll() {
        this.input = [];
        document.getElementById('support_section').innerText = "";
        console.log('cleared');
    }
    resetHistory() {
        this.history.clearHistory()
    }
    isValidNumber(i) {
        const regex = /^\d+$/;
        return regex.test(i)
    }
}

