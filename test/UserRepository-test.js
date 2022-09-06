import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';

describe('User Repository', () => {
    let user1;
    let user2;
    let users;
    let userRepository;
    let sleepObject1, sleepObject2, sleepObject3;
    let sleepArray;

    beforeEach(() => {
        user1 = new User({
            'id': 1,
            'name': 'Luisa Hane',
            'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
            'email': 'Diana.Hayes1@hotmail.com',
            'strideLength': 4.3,
            'dailyStepGoal': 10000,
            'friends': [
              16,
              4,
              8
            ]
          });

        user2 = new User({
            'id': 2,
            'name': 'Jarvis Considine',
            'address': '30086 Kathryn Port, Ciceroland NE 07273',
            'email': 'Dimitri.Bechtelar11@gmail.com',
            'strideLength': 4.5,
            'dailyStepGoal': 5000,
            'friends': [
              9,
              18,
              24,
              19
            ]
          });

        users = [user1, user2];

        userRepository = new UserRepository(users);

        sleepObject1 = new Sleep({'userID': 1, 'date': '2019/06/15', 'hoursSlept': 6.1, 'sleepQuality': 2.2});

        sleepObject2 = new Sleep ({'userID': 2, 'date': '2019/06/15', 'hoursSlept': 7, 'sleepQuality': 4.7});

        sleepObject3 = new Sleep({'userID': 2, 'date': '2019/06/16', 'hoursSlept': 7.5, 'sleepQuality': 3.8});

        sleepArray = [
          sleepObject1,
          sleepObject2,
          sleepObject3
        ];
    });

    it('Should be a function', () => {
      expect(UserRepository).to.be.a('function');
    });

    it('Should be an instance of UserRepository', () => {
      expect(userRepository).to.be.an.instanceOf(UserRepository);
    });

    it('Should take in and store an array of user data', () => {
      expect(userRepository.userData).to.deep.equal(users);
    });

    it('Should be able to return a user data by id', () => {
      expect(userRepository.returnUserData(1)).to.deep.equal(user1);
    });

    it('Should be able to calculate the average of all user data', () =>  {
      expect(userRepository.returnAverageUserData(sleepArray)).to.equal('3.57');
    });
});
