class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.address = userObj.address;
    this.email = userObj.email;
    this.strideLength = userObj.strideLength;
    this.dailyStepGoal = userObj.dailyStepGoal;
    this.friends = userObj.friends;
  }

  returnUserFirstName() {
    let arrayedName = this.name.split(" ");
    return arrayedName[0];
  };

  findUser(array) {
    const newArray = array.filter(element =>
        element.userID === this.id);
    return newArray;
  };

  returnAllTimeHydration(array) {
    const newArray = this.findUser(array);
    const userTotal = newArray.reduce((totalOunces, day) => {
          totalOunces += day.numOunces;
          return totalOunces
      }, 0)
    let userAverage = userTotal / newArray.length;
    return userAverage
  };

  returnUserOuncesByDay(array, date) {
    const newArray = this.findUser(array);
    const dailyOunces = newArray.find(element => element.date === date)
    return dailyOunces.numOunces;
  };

  returnUserWeekData(array) {
    const userArray = this.findUser(array);
    const userDatesArray = userArray
      .splice(0,7)
      .map(hydrationObj => hydrationObj.numOunces)

    return userDatesArray;
  };

};

export default User;
