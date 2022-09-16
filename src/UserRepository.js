class UserRepository {
  constructor(data) {
    this.userData = data;
  };

  returnUserData(id) {
    let userInfo = this.userData.find(user => id === user.id)
    return userInfo
  };

  returnAverageUserData(array, dataNeeded) {
      let average = array.reduce((total, current) => {
        total += current[dataNeeded]
        return total;
      }, 0)
      return parseInt(average / array.length)
    }

    returnAverageMilesWalked(array1, date) {
      //average number of miles each user walked on that given day
        return array1
        .filter(activityObj => activityObj.date === date)
        .map(activityObj => {
          (activityObj.numSteps * this.userData.find(userObj => userObj.id === activityObj.userID).strideLength) / 5280
        })
        .reduce((totalMilesWalked, curr) => {
          return totalMilesWalked += curr;
        }, 0)
    }

};

export default UserRepository;
