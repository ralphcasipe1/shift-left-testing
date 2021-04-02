const { expect } = require('chai');

const subtract = require('./subtract');

describe('subtract', () => {
  it('should have the correct difference ', () => {
    expect(subtract(2, 2)).to.equals(0);
  });
});
