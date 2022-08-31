class UserRepository {
  constructor (data) {
    this.userData = data;
  };

  returnUserData(id){
    let userInfo = this.userData.find(user => id === user.id)
    return userInfo
  };

//dataType ===  sleep array
//returnAverageUserData(sleepData)
  returnAverageUserData(dataArray){
    if (dataArray === 'steps') {
        let average = this.userData.reduce((total, user) => {
            total += user.dailyStepGoal
            return total;
          }, 0)
          return parseInt(average / this.userData.length)
    } else {
        let average = dataArray.reduce((total, id) => {
            total += id.sleepQuality
            return total;
          }, 0)
          return parseFloat(average / dataArray.length).toFixed(2)
        };
    }
};

export default UserRepository;
