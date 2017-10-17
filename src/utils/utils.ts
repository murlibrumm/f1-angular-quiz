const randomIntFromInterval = (min, max) => { // TODO externalize
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export { randomIntFromInterval };
