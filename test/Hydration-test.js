import { expect } from 'chai';
import Hydration from '../src/Hydration.js';

describe('Hydration', () => {
    let hydrationObject1;
    let hydrationObject2;

    beforeEach(() => {
        hydrationObject1 = new Hydration({
            'id': 1,
            'date': '2022/08/29',
            'numOunces': 36
        });

        hydrationObject2 = new Hydration({
            'id': 2,
            'date': '2022/08/28',
            'numOunces': 42
        });
    });

    it('Should be a function', () => {
        expect(Hydration).to.be.a('function');
    });

    it('Should be an instance of Hydration', () => {
        expect(hydrationObject1).to.be.an.instanceOf(Hydration);
        expect(hydrationObject2).to.be.an.instanceOf(Hydration);
    });

    it('Should have an id', () => {
        expect(hydrationObject1.user).to.equal(1);
        expect(hydrationObject2.user).to.equal(2);
    });

    it('Should have an date', () => {
        expect(hydrationObject1.date).to.equal('2022/08/29');
        expect(hydrationObject2.date).to.equal('2022/08/28');
    });

    it('Should list the number of ounces consumed', () => {
        expect(hydrationObject1.ouncesConsumed).to.equal(36);
        expect(hydrationObject2.ouncesConsumed).to.equal(42);
    });
});
