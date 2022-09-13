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

  returnAllTimeHydration(array) {
    const newArray = this.findUser(array);
    const userTotal = newArray.reduce((totalOunces, day) => {
          totalOunces += day.numOunces;
          return totalOunces
      }, 0)
    let userAverage = parseFloat(userTotal / newArray.length).toFixed(2);
    return userAverage
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

  returnOverallAverageHours(array) {
    const newArray = this.findUser(array);
    const averageHours = newArray.reduce((totalHours, day) => {
        totalHours += day.hoursSlept;
        return totalHours
    }, 0)
      return (averageHours / newArray.length).toFixed(2);
  };

  returnOverallAverageQuality(array) {
    const newArray = this.findUser(array);
    const averageQuality = newArray.reduce((totalQuality, day) => {
      totalQuality += day.sleepQuality;
      return totalQuality
    }, 0)
    return (averageQuality / newArray.length).toFixed(2);
  };

  returnSleepHoursByDay(array, date) {
    const newArray = this.findUser(array);
    const dailyHours = newArray.find(element => element.date === date)
    return dailyHours.hoursSlept;
  };

  returnSleepQualityByDay(array, date) {
    const newArray = this.findUser(array);
    const dailyQuality = newArray.find(element => element.date === date)
    return dailyQuality.sleepQuality;
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

    
};

export default User;
