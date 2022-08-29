class Hydration {
    constructor(hydrationObject) {
        this.userID = hydrationObject.userID,
        this.date = hydrationObject.date,
        this.numOunces = hydrationObject.numOunces
    };

    returnAllTimeHydration(array, userID) {
        const newArray = array.filter(element =>
            element.userID === userID
        )
        const userTotal = newArray.reduce((totalOunces, day) => {
            totalOunces += day.numOunces;
            return totalOunces
        }, 0)
      let userAverage = userTotal / newArray.length;
      return userAverage
    }
};

export default Hydration