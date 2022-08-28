class UserRepository {
  constructor (data){
    this.userData = data;
  };
  returnUserData(id){
    let userInfo = this.userData.find(user => id === user.id)
    return userInfo
  };

  returnAllUserStepGoal(){
    let allSteps = this.userData.reduce((totalStepCount, user) => {
      totalStepCount += user.dailyStepGoal
      return totalStepCount;
    }, 0)
    return parseInt(allSteps / this.userData.length)
  };
};

export default UserRepository;
