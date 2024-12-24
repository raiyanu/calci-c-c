export default class CalciHistory {
    constructor() {
        this.history = this.loadHistory();
        this.historyTabElement = document.getElementById("historyTabElement");
        this.updateUI()
    }
    loadHistory() {
        return localStorage.getItem("calichistory")
            ? JSON.parse(localStorage.getItem("calichistory"))
            : [];
    }
    updateLocalStorageHistory() {
        localStorage.setItem("calichistory", JSON.stringify(this.history));
    }

    addHistory({ operation, result }) {
        this.history.push({ operation, result });
        this.updateLocalStorageHistory();
        this.updateUI()
    }
    clearHistory() {
        this.history = [];
        this.updateLocalStorageHistory();
        this.updateUI()
    }
    updateUI() {
        while (this.historyTabElement.firstChild) {
            this.historyTabElement.removeChild(this.historyTabElement.firstChild);
        }
        this.history.forEach((e) => {
            this.historyTabElement.appendChild(
                this.createHistoryListElement({
                    operation: e.operation,
                    result: e.result,
                })
            );
        });
        this.historyTabElement.scrollBy(0, 10000);
    }
    createHistoryListElement({ operation, result }) {
        let customElement = document.createElement("div");
        customElement.innerHTML = `${operation} <hr> ${result}`;
        return customElement;
    }
}
