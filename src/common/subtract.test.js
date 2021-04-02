const fc = require('fast-check');
const { expect } = require('chai');

const subtract = require('./subtract');

describe('subtract', () => {
  it('should have the correct difference', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        const difference = subtract(a, b);

        expect(difference).to.be.equals(a - b);
      }),
    );
  });
});
