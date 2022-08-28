import { expect } from 'chai';
import User from '../src/User.js';

describe('User', () => {
    let user1;
    let user2;

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
});