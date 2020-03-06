class StrategiesManager {
    constructor() {
        this._strategy = null;
    }

    set strategy(strategy /* instance extends BaseStrategy */) {
        this._strategy = strategy;
    }

    get strategy() {
        return this._strategy;
    }

    doAction(opts) {
        this._strategy.doAction(opts);
    }
}

export default StrategiesManager;