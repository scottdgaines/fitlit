class Hydration {
    constructor(hydrationObject) {
        this.user = hydrationObject.id,
        this.date = hydrationObject.date,
        this.ouncesConsumed = hydrationObject.numOunces
    };
};

export default Hydration