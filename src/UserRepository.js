class UserRepository {
  constructor (data){
    this.userData = data;
  };
  returnUserData(id){
    let userInfo = this.userData.find(user => id === user.id)
    return userInfo
  };

  returnAllUserStepGoal(){

  }
};

export default UserRepository;
