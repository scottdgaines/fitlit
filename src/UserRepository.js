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
    };

    returnAverageMilesWalked(array, date) {
        const filteredArray = array
        .filter(activityObj => {
          return activityObj.date === date})
        .map(activityObj => {
          return parseFloat((activityObj.numSteps * this.userData.find(userObj => userObj.id === activityObj.userID).strideLength) / 5280);
        })

        const total = filteredArray.reduce((totalMilesWalked, curr) => {
          return totalMilesWalked += curr;
        }, 0)
        return (total / filteredArray.length).toFixed(2);
    };

};

export default UserRepository;
