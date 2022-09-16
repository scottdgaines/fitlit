import { expect } from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';

describe('Activity', () => {
    let activity1;
    let activity2;
    let activity3;
    let user1;

    beforeEach(() => {
        activity1 = new Activity({
            userID: 1,
            date: "2019/06/15",
            numSteps: 3577,
            minutesActive: 140,
            flightsOfStairs: 16
        });

        activity2 = new Activity({
            userID: 2,
            date: "2019/06/15",
            numSteps: 4294,
            minutesActive: 138,
            flightsOfStairs: 10
        });

        activity3 = new Activity({
            userID: 1,
            date: "2019/06/14",
            numSteps: 10001,
            minutesActive: 238,
            flightsOfStairs: 70
        })

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
    });

    it('Should be a function', () => {
        expect(Activity).to.be.a('function');
      });

    it('Should be an instance of Activity', () => {
        expect(activity1).to.be.an.instanceOf(Activity);
        expect(activity2).to.be.an.instanceOf(Activity);
    });

    it('Should have a unique user id', () => {
        expect(activity1.userID).to.equal(1);
        expect(activity2.userID).to.equal(2);
        });

    it('Should have a date', () => {
        expect(activity1.date).to.equal('2019/06/15');
        expect(activity2.date).to.equal('2019/06/15');
    });

    it('Should have a number of steps for a user', () => {
        expect(activity1.numSteps).to.equal(3577);
        expect(activity2.numSteps).to.equal(4294);
    });

    it('Should have the number of minutes active for a user', () => {
        expect(activity1.minutesActive).to.equal(140);
        expect(activity2.minutesActive).to.equal(138);
    });

    it('Should have the flights of stairs climbed by a user', () => {
        expect(activity1.flightsOfStairs).to.equal(16);
        expect(activity2.flightsOfStairs).to.equal(10);
    });

    it('Should log if the user reached their step goal on a given day', () => {
        expect(activity1.achieveStepGoal(user1)).to.equal(false);
        expect(activity3.achieveStepGoal(user1)).to.equal(true);
    });
});
