class Hydration {
    constructor(hydrationObject) {
        this.userID = hydrationObject.userID,
        this.date = hydrationObject.date,
        this.numOunces = hydrationObject.numOunces
    };

    findUser(array, userID) {
      const newArray = array.filter(element =>
          element.userID === userID);
      return newArray;
    };

    returnAllTimeHydration(array, userID) {
      const newArray = this.findUser(array, userID);
      const userTotal = newArray.reduce((totalOunces, day) => {
            totalOunces += day.numOunces;
            return totalOunces
        }, 0)
      let userAverage = userTotal / newArray.length;
      return userAverage
    };

    userOuncesByDay(array, userID, date) {
      const newArray = this.findUser(array, userID);
      const dailyOunces = newArray.find(element => element.date === date)
      return dailyOunces.numOunces;
    };
};


export default Hydration
