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

};

export default UserRepository;
