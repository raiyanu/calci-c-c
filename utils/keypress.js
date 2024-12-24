window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return;
        }
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(event.key)) === true) {
            numpadHit(event.key);
        } else if (["+", "-", "/", "*",].includes(event.key) === true) {
            Operator(event.key);
        } else if ("Enter" === event.key) {
            EQUALS();
        }
        console.log(event.key);
    },
    true,
);
