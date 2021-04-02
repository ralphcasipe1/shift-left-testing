const { expect } = require("chai");

const add = require('./add');

describe('add', function () {
  it('should have the correct sum', function () {
    expect(add(2, 2)).to.equals(4);
  });
});