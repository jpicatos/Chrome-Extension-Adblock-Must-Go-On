class StrategiesManager {
    constructor() {
        this._strategy = null;
    }

    set strategy(strategy) {
        this._strategy = strategy;
    }

    get strategy() {
        return this._strategy;
    }

    doAction(opts) {
        this._strategy.doAction(opts);
    }

    // Common function to remove html element 
    remove(elem) {
        if (elem) {
            if (typeof elem.remove === 'function') {
                elem.remove();
            } else {
                elem.parentNode.removeChild(textField);
            }
        }
    }
}

export default StrategiesManager;