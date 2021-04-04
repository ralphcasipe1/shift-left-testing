## Prettify via Linting

We should also be conscious on how our code looks, it should aesthetically easy to understand while reading it.

In order to achieve this, you need first install these tools:

```bash
npm i prettier
```

Add this file, `.prettierrc` to the root project and add this configuration:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```

You can try this out:

First mess up the code from `src/common/add.js`, like this:

```js
module.exports = (
  a,
  b,
) => a + b;
```

Run this command, to check the given files

```bash
npx prettier -c .
```

You would see warning to those printed fileaname that does not adhere to the code style.

Run this command to fix it

```bash
npx prettier -w .
```

But doing this manually is cumbersome, there is a better way.

You can add a plugin of `prettier` for `eslint`, install these:

```
npm i -D eslint-config-prettier eslint-plugin-prettier
```

Update your `.eslintrc`

```
{
  "plugins": ["prettier"],
  "extends": [
    "airbnb-base",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "env": {
    "node": true,
    "mocha": true
  }
}
```

Messed up the `src/common/add.js` again.
```js
module.exports = (
  a,
  b,
) => a + b;
```

Now try running your lint script, `npm run lint:fix`, it will prettify and at the same lint your JavaScript files.

## Improving commit by Git Hooks

```bash
npm i -D husky
```

```bash
npm set-script prepare "husky install" && npm run prepare
```

```bash
npx husky add .husky/pre-commit "npm run lint"
```

```bash
npx husky add .husky/pre-push "npm run test"
```

### Linting only the committed files

```bash
npm i -D lint-staged
```

Create a file, `.lintstagedrc` in the root project folder.

Add this to inside `.lintstagedrc`

```json
{
  "*.js": "eslint --fix"
}
```

Modify `.husky/pre-commit`, to `npx lint-staged`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

Try to add `subtract.js` and `subtract.test.js` inside `/src/common/`. Make sure to try to messed the aesthetics of newly added code, Like this:

`subtract.js`

```js
module.exports = (
  a,
  b,
) => a - b;
```

`subtract.test.js`

```js
const { expect } = require('chai');

const subtract = require('./subtract');

describe('subtract', () => {
  it('should have the correct difference ', () => {
    expect(subtract(2, 2))
    .to.equals(0);
  });
});
```

Now commit the newly added files. It will prettify and lint at the same time on the file. There's no need for you to run `npm run lint:fix`.

There is also another way. Some text editors support lint fixing on save, esp. VSCode or Vim. However, we will not cover those.

GO TO [Property-based testing](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/PROPERTY_BASED_TESTING.md)