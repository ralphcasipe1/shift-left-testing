const { expect } = require('chai');

const add = require('./add');

describe('add', () => {
  it('should have the correct sum', () => {
    expect(add(2, 2)).to.equals(4);
  });
});
