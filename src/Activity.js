class Activity {
    constructor(activityObj) {
      this.userID = activityObj.userID;
      this.date = activityObj.date;
      this.flightsOfStairs = activityObj.flightsOfStairs;
      this.minutesActive = activityObj.minutesActive;
      this.numSteps = activityObj.numSteps;
    };

    returnMilesWalked(user) {
        return (this.numSteps * user.strideLength / 5280).toFixed(2)
    };

    achieveStepGoal(user) {
        if (this.numSteps >= user.dailyStepGoal) {
            return true
        } else {
            return false
        };
    };

  };

  export default Activity;
