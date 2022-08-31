import { expect } from 'chai';
import User from '../src/User.js';
import Hydration from '../src/Hydration.js'


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
    let array;
    let array1;


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
            'date': '2022/08/28',
            'numOunces': 42
        });

        hydrationObject3 = new Hydration({
            'userID': 2,
            'date': '2022/08/26',
            'numOunces': 2
        });

        hydrationObject4 = new Hydration({
            'userID': 2,
            'date': '2022/08/24',
            'numOunces': 10
        })

        hydrationObject5 = new Hydration({
            'userID': 2,
            'date': '2022/08/21',
            'numOunces': 23
        })
        hydrationObject6 = new Hydration({
            'userID': 2,
            'date': '2022/08/27',
            'numOunces': 60
        });

        hydrationObject7 = new Hydration({
            'userID': 2,
            'date': '2022/07/27',
            'numOunces': 19
        });

        hydrationObject8 = new Hydration({
            'userID': 2,
            'date': '2022/06/27',
            'numOunces': 20
        });

        hydrationObject9 = new Hydration({
            'userID': 2,
            'date': '2022/05/27',
            'numOunces': 40
        });

        hydrationObject10 = new Hydration({
            'userID': 1,
            'date': '2022/08/15',
            'numOunces': 30
        });

        array = [
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

        array1 = [
            hydrationObject2,
            hydrationObject3,
            hydrationObject4,
            hydrationObject5,
            hydrationObject6,
            hydrationObject7,
            hydrationObject8,
            hydrationObject9
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
        expect(user2.findUser(array)).to.deep.equal(array1);
    });

    it('Should return the total average ounces consumed for a user', () => {
        expect(user1.returnAllTimeHydration(array)).to.equal(33);
    });

    it('Should return the total number of ounces a user consumed on a specific date', () => {
      expect(user1.returnUserOuncesByDay(array, '2022/08/15')).to.equal(30);
    });

    it('Should return a week\'s data for a user', () => {
      expect(user2.returnUserWeekData(array)).to.deep.equal([42, 2, 10, 23, 60, 19, 20]);
    });

});