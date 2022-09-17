class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.address = userObj.address;
    this.email = userObj.email;
    this.strideLength = userObj.strideLength;
    this.dailyStepGoal = userObj.dailyStepGoal;
    this.friends = userObj.friends;
  };

  returnUserFirstName() {
    let arrayedName = this.name.split(" ");
    return arrayedName[0];
  };

  findUser(array) {
    const newArray = array.filter(element =>
        element.userID === this.id);
    return newArray;
  };

  findMostRecentDate(array) {
    const userArray = this.findUser(array);
    const datesArray = userArray.map(entry => {
      return entry.date
    }).reverse()
    return datesArray[0];
  };

  returnUserDataByDay(array, date, neededData) {
    const newArray = this.findUser(array);
    const dailyData = newArray.find(element => element.date === date)
    return dailyData[neededData];
  };

  returnUserWeekData(array, neededData) {
    const userArray = this.findUser(array);
    const userDatesArray = userArray
      .reverse()
      .splice(0,7)
      .map(dataObj =>
        `${dataObj.date}: ${dataObj[neededData]}`)
    return userDatesArray;
  };

  returnOverallAverage(array, neededData) {
    const newArray = this.findUser(array);
    const averageData = newArray.reduce((total, day) => {
        total += day[neededData];
        return total
    }, 0)
      return (averageData / newArray.length).toFixed(2);
  };

  returnWeeksActivity(array, date) {
    const newArray = this.findUser(array);
    const index = newArray.indexOf(newArray.find(dataSet => dataSet.date === date));
    const userDatesArray = newArray
      .reverse()
      .splice(index,7);
    const totalMinutes = userDatesArray.reduce((totalActivity, day) => {
      totalActivity += day.minutesActive;
      return totalActivity;
      }, 0);

      return totalMinutes / userDatesArray.length;
  };

    returnExceededStepGoals(array) {
      const newArray = this.findUser(array);
      return newArray.filter(dataSet => {return dataSet.achieveStepGoal(this) === true})
        .map(dataSet => dataSet.date)
    };

    returnMilesWalked(array, date) {
      return (this.returnUserDataByDay(array, date, 'numSteps') * this.strideLength / 5280).toFixed(2)
    };

    returnStairRecord(array) {
      const newArray = this.findUser(array);
      return newArray.sort((a, b) => {
        return b.flightsOfStairs - a.flightsOfStairs
      })[0].flightsOfStairs;
    }


};

export default User;
