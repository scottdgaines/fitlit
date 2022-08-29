import { expect } from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', () => {
  let sleep1;
  let sleep2;

    beforeEach(() => {
      sleep1 = new Sleep({
            "userID": 1,
            "date": "2019/06/15",
            "hoursSlept": 6.1,
            "sleepQuality": 2.2
      });

      sleep2 = new Sleep({
            "userID": 2,
            "date": "2019/06/16",
            "hoursSlept": 7.5,
            "sleepQuality": 3.8
      });

    });

    it('should be a function', () => {
      expect(Sleep).to.be.a('function');
    });

    it('should be an instance of Sleep', () => {
      expect(sleep1).to.be.an.instanceOf(Sleep);
      expect(sleep2).to.be.an.instanceOf(Sleep);
    });

    it('should have a unique user id', () => {
      expect(sleep1.userID).to.equal(1)
      expect(sleep2.userID).to.equal(2)
    });

    it('should have a date', () => {
      expect(sleep1.date).to.equal("2019/06/15")
      expect(sleep2.date).to.equal("2019/06/16")
    });

    it('should have a number of hours the user has slept', () => {
      expect(sleep1.hoursSlept).to.equal(6.1)
      expect(sleep2.hoursSlept).to.equal(7.5)
    });

    it('should have a sleep quality amount for the user', () => {
      expect(sleep1.sleepQuality).to.equal(2.2)
      expect(sleep2.sleepQuality).to.equal(3.8)
    });

  });
