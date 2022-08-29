import { expect } from 'chai';
import Hydration from '../src/Hydration.js';

describe('Hydration', () => {
    let hydrationObject1;
    let hydrationObject2;
    let hydrationObject3;
    let array;

    beforeEach(() => {
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
            'date': '2022/08/27',
            'numOunces': 23
        })

        array = [
            hydrationObject1,
            hydrationObject2,
            hydrationObject3
        ]
    });

    it('Should be a function', () => {
        expect(Hydration).to.be.a('function');
    });

    it('Should be an instance of Hydration', () => {
        expect(hydrationObject1).to.be.an.instanceOf(Hydration);
        expect(hydrationObject2).to.be.an.instanceOf(Hydration);
    });

    it('Should have an id', () => {
        expect(hydrationObject1.userID).to.equal(1);
        expect(hydrationObject2.userID).to.equal(2);
    });

    it('Should have an date', () => {
        expect(hydrationObject1.date).to.equal('2022/08/29');
        expect(hydrationObject2.date).to.equal('2022/08/28');
    });

    it('Should list the number of ounces consumed', () => {
        expect(hydrationObject1.numOunces).to.equal(36);
        expect(hydrationObject2.numOunces).to.equal(42);
    });

    it('Should return the total average ounces consumed for a user', () => {
        expect(hydrationObject1.returnAllTimeHydration(array, 2)).to.equal(32.5);
    })
});
