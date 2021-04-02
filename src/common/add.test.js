const fc = require('fast-check');
const { expect } = require('chai');

const add = require('./add');

describe('add', () => {
  it('should have the correct sum', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        const sum = add(a, b);

        expect(sum).to.be.equals(a + b);
      }),
    );
  });
});
