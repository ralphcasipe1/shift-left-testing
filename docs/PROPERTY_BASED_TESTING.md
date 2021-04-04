## Improve unit test by property-based testing
```
npm i -D fast-check
```

Update your `add.spec.js` and `substract.spec.js`

`add.spec.js`
```js
const fc = require('fast-check');
const { expect } = require('chai');

const add = require('./add');

describe('add', () => {
  it('should have the correct sum', () => {
    fc.assert(
      fc.property(
        fc.integer(), fc.integer(), 
        (a,b) => {
          const sum = add(a, b);

          expect(sum).to.be.equals(a + b);
        }));
  });
});
```

`substract.spec.js`
```js
const fc = require('fast-check');
const { expect } = require('chai');

const subtract = require('./subtract');

describe('subtract', () => {
  it('should have the correct difference', () => {
    fc.assert(
      fc.property(
        fc.integer(), fc.integer(), 
        (a,b) => {
          const difference = subtract(a, b);

          expect(difference).to.be.equals(a - b);
        }));
  });
});
```