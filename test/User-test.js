import { expect } from 'chai';
import User from '../src/User.js';
import Hydration from '../src/Hydration.js'
import Sleep from '../src/Sleep.js'


describe('User', () => {
    let user1;
    let user2;
    let hydrationObject1;
    let hydrationObject2;
    let hydrationObject3;
    let hydrationObject4;
    let hydrationObject5;
    let hydrationObject6;
    let hydrationObject7;
    let hydrationObject8;
    let hydrationObject9;
    let hydrationObject10;
    let hydrationArray;
    let hydrationArray1;
    let sleepObject1;
    let sleepObject2;
    let sleepObject3;
    let sleepArray;
    let sleepArray1;

    beforeEach(() => {
        user1 = new User({
            "id": 1,
            "name": "Luisa Hane",
            "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
            "email": "Diana.Hayes1@hotmail.com",
            "strideLength": 4.3,
            "dailyStepGoal": 10000,
            "friends": [
              16,
              4,
              8
            ]
          });

        user2 = new User({
                "id": 2,
                "name": "Jarvis Considine",
                "address": "30086 Kathryn Port, Ciceroland NE 07273",
                "email": "Dimitri.Bechtelar11@gmail.com",
                "strideLength": 4.5,
                "dailyStepGoal": 5000,
                "friends": [
                  9,
                  18,
                  24,
                  19
                ]
        });

        hydrationObject1 = new Hydration({
            'userID': 1,
            'date': '2022/08/29',
            'numOunces': 36
        });

        hydrationObject2 = new Hydration({
            'userID': 2,
            'date': '2022/08/01',
            'numOunces': 42
        });

        hydrationObject3 = new Hydration({
            'userID': 2,
            'date': '2022/08/02',
            'numOunces': 2
        });

        hydrationObject4 = new Hydration({
            'userID': 2,
            'date': '2022/08/03',
            'numOunces': 10
        })

        hydrationObject5 = new Hydration({
            'userID': 2,
            'date': '2022/08/04',
            'numOunces': 23
        })
        hydrationObject6 = new Hydration({
            'userID': 2,
            'date': '2022/08/05',
            'numOunces': 60
        });

        hydrationObject7 = new Hydration({
            'userID': 2,
            'date': '2022/08/06',
            'numOunces': 19
        });

        hydrationObject8 = new Hydration({
            'userID': 2,
            'date': '2022/08/07',
            'numOunces': 20
        });

        hydrationObject9 = new Hydration({
            'userID': 2,
            'date': '2022/08/08',
            'numOunces': 40
        });

        hydrationObject10 = new Hydration({
            'userID': 1,
            'date': '2022/08/15',
            'numOunces': 30
        });

        hydrationArray = [
            hydrationObject1,
            hydrationObject2,
            hydrationObject3,
            hydrationObject4,
            hydrationObject5,
            hydrationObject6,
            hydrationObject7,
            hydrationObject8,
            hydrationObject9,
            hydrationObject10
        ];

        hydrationArray1 = [
            hydrationObject2,
            hydrationObject3,
            hydrationObject4,
            hydrationObject5,
            hydrationObject6,
            hydrationObject7,
            hydrationObject8,
            hydrationObject9
        ];

        sleepObject1 = new Sleep({
              "userID": 1,
              "date": "2019/06/15",
              "hoursSlept": 6.1,
              "sleepQuality": 2.2
        });

        sleepObject2 = new Sleep({
              "userID": 2,
              "date": "2019/06/16",
              "hoursSlept": 7.5,
              "sleepQuality": 3.8
        });
        sleepObject3 = new Sleep ({
              "userID": 2,
              "date": "2019/06/15",
              "hoursSlept": 7,
              "sleepQuality": 4.7
        });

        sleepArray = [
          sleepObject1,
          sleepObject2,
          sleepObject3
        ];
    });

    it('Should be a function', () => {
        expect(User).to.be.a('function');
    });

    it('Should be an instance of User', () => {
        expect(user1).to.be.an.instanceOf(User);
        expect(user2).to.be.an.instanceOf(User);
    });

    it('Should have a unique ID', () => {
        expect(user1.id).to.equal(1);
        expect(user2.id).to.equal(2);
    });

    it('Should have a name', () => {
        expect(user1.name).to.equal('Luisa Hane');
        expect(user2.name).to.equal('Jarvis Considine');
    });

    it('Should have an address', () => {
        expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
        expect(user2.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
    });

    it('Should have an email', () => {
        expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
        expect(user2.email).to.equal('Dimitri.Bechtelar11@gmail.com');
    });

    it('Should have a stride length', () => {
        expect(user1.strideLength).to.equal(4.3);
        expect(user2.strideLength).to.equal(4.5);
    });

    it('Should have a daily step goal', () => {
        expect(user1.dailyStepGoal).to.equal(10000);
        expect(user2.dailyStepGoal).to.equal(5000);
    });

    it('Should have a friends', () => {
        expect(user1.friends).to.deep.equal([16, 4, 8]);
        expect(user2.friends).to.deep.equal([9, 18, 24, 19]);
    });

    it('Should return a user\'s first name', () => {
        expect(user1.returnUserFirstName()).to.equal('Luisa');
        expect(user2.returnUserFirstName()).to.equal('Jarvis');
    });

    it('Should filter all entries for a user', () => {
        expect(user2.findUser(hydrationArray)).to.deep.equal(hydrationArray1);
    });

    it('Should find the most recent date for a user', () => {
      expect(user2.findMostRecentDate(hydrationArray)).to.equal('2022/08/08')
    });

    it('Should return the total average ounces consumed for a user', () => {
        expect(user1.returnAllTimeHydration(hydrationArray)).to.equal(33);
    });

    it('Should return the total number of ounces a user consumed on a specific date', () => {
      expect(user1.returnUserOuncesByDay(hydrationArray, '2022/08/29')).to.equal(36);
    });

    it('Should return a week\'s data for a user', () => {
      expect(user2.returnUserWeekData(hydrationArray, 'numOunces')).to.deep.equal([42, 2, 10, 23, 60, 19, 20]);
      expect(user2.returnUserWeekData(sleepArray, 'hoursSlept')).to.deep.equal([7.5, 7]);
      expect(user2.returnUserWeekData(sleepArray, 'sleepQuality')).to.deep.equal([3.8, 4.7]);
    });

    it('Should return the user\'s average hours of sleep per day', () => {
      expect(user2.returnAverageHoursPerDay(sleepArray)).to.equal(7.25);
    });

    it('Should return the user\'s average sleep quality per day', () => {
      expect(user2.returnAverageQualityPerDay(sleepArray)).to.equal(4.25);
    });

    it('Should return the hours a user slept on a specific day', () => {
      expect(user2.returnSleepHoursByDay(sleepArray, '2019/06/15')).to.equal(7);
    });

    it('Should return the sleep quality amount a user slept on a specific day', () => {
      expect(user2.returnSleepQualityByDay(sleepArray, '2019/06/15')).to.equal(4.7);
    });
});
