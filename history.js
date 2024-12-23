function CalciHistory() {
    this.loadHistory = () => {
        return localStorage.getItem("calichistory") ? JSON.parse(localStorage.getItem("calichistory")) : [];
    };
    this.updateLocalStorageHistory = () => {
        localStorage.setItem("calichistory", JSON.stringify(this.history));
    };

    this.history = this.loadHistory();

    this.addHistory = ({ operatorSymbol, operand1, operand2, result }) => {
        this.history.push([operand1, operatorSymbol, operand2, result]);
        this.updateLocalStorageHistory();
    }
    this.clearHistory = () => {
        this.history = [];
        this.updateLocalStorageHistory();
    }
    console.log(this.history);
}

window.calciHistory = () => {
    return new CalciHistory();
};
