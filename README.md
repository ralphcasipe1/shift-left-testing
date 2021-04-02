# Shift-Left testing

## Introduction

In this section we will create a dead simple small app. We will adhere to these guidelines:

- Follow the current best practices
- Maintain code quality via linting
- Engage ourselves in shift-left testing
- Use github actions for our CI
- Do TDD (not religiously) via unit testing
- Do test coverage
- Write acceptance criteria for our BDD Testing
- Do minimal chaos engineering

For those who aare reading this, I assume you have a basic knowledge in NodeJS and Git. I will try my best to make this friendly for absolute begineers also.

## Initializing NodeJS project

### Create a folder and named it as `shift-left-testing`.

Inside the folder, `shift-left-testing`, run this command:

```bash
npm init -y
```

It will generate a `package.json` inside the folder.

## Initial testing

### Install tools for testing

```bash
npm i -D mocha chai
```

These tools would help us start testing things we wanted to created.

- `mocha` is a test runner, as the name suggested, it runs the test we've written to be readable.

- `chai` is a assertion tool for testing, the purpose for this is to help the us compare the actual result to the expected result.

### Structure your directory like this:

```bash
├── package.json
├── package-lock.json
|── node_modules
└── src
    ├── common
    │   ├── add.js
    │   └── add.test.js
    └── user
```

As you've noticed, we include the test file, `add.test.js`, together with the file we are going to test, `add.js`.

This way we could group all the related stuff and glue them together to reduce mental mapping when correlating something.

The advantage of grouping the files including the test inside a directory via domains would be prevalent and impactful as we go further.

## Initial commit

For now, let try committing our code using `git`.

Follow the instructions:

```bash
git init
```

This would initialize that this project can be use with `git`.

```bash
git status
```

Make sure to ignore `node_modules`, By creating `.gitignore` inside the root of the project folder.

Write `node_modules` inside `.gitignore`, For example:

```.gitignore
node_modules
```

Run the `git status` again. You would see the `node_modules` is ignored.

We have to commit all our changes first as an **initial commit**.

```
git add .
```

```
git commit -m "initial commit"
```

```
git branch -M main
```

Now you're ready to add the initial implementation on your GitHub.

```bash
git remote add origin https://github.com/<username>/shift-left-testing.git
```

```
git push -u origin main
```

## Initial implementation in workflow Github Actions

With our current progress, we can set up the test with CI pipeline using github actions. Let's do it!

Create a folder, `.github/workflows` inside your root project.

Create a file and name it as `action.yml`.

```yml
name: 'Shift-Left Testing'

on:
  pull_request:
  push:
    branches:
      - main
      - 'feature/*'

jobs:
  install_dependencies:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - uses: actions/cache@v2.1.4
        with:
          path: node_modules
          key: dependencies-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        run: npm install

  test:
    needs: install_dependencies
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - uses: actions/cache@v2.1.4
        with:
          path: node_modules
          key: dependencies-${{ hashFiles('**/package-lock.json') }}
      - name: Run tests
        run: npm test
```

Commit this file

```bash
git add .github/workflows/action.yml
```

```bash
git commit -m "feat(ci): add workflow github actions"
```

## Linting

Install linting tools

```bash
npm i -D eslint eslint-plugin-import eslint-config-airbnb-base
```

Add new `script` in your `package.json`:

```json
"scripts": {
  "test": "mocha",
  "lint": "eslint ."
}
```

Try to run the following command:

```bash
npm run lint
```

This will show the files that did not follow the linting rules. We can fix this quickly. By adding a new script again in your `package.json`

```json
"scripts": {
  "test": "mocha",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
},
```

And run the newly added command:

```bash
npm run lint:fix
```

This would automatically fix the trivial stuff that are against the linting rules.

You can commit the changes that happend here. Make sure to leave an easy to understand message.

## Add linting job in workflow github actions

Apply the new lint job on `.github/workflows/action.yml` above the `test` job.

```yaml
lint:
  needs: install_dependencies
  runs-on: ubuntu-20.04
  steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '14'
    - uses: actions/cache@v2.1.4
      with:
        path: node_modules
        key: dependencies-${{ hashFiles('**/package-lock.json') }}
    - name: Linting
      run: npm run lint

test: .....
```

Make sure to change the `needs` of `test` job from `install_dependencies` to `lint`.

```yml
test:
  needs: lint
```

This will be the current result:

```yml
name: 'Shift-Left Testing'

on:
  pull_request:
  push:
    branches:
      - main
      - 'feature/*'

jobs:
  install_dependencies:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - uses: actions/cache@v2.1.4
        with:
          path: node_modules
          key: dependencies-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        run: npm install

  lint:
    needs: install_dependencies
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - uses: actions/cache@v2.1.4
        with:
          path: node_modules
          key: dependencies-${{ hashFiles('**/package-lock.json') }}
      - name: Linting
        run: npm run lint

  test:
    needs: lint
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - uses: actions/cache@v2.1.4
        with:
          path: node_modules
          key: dependencies-${{ hashFiles('**/package-lock.json') }}
      - name: Run tests
        run: npm test
```

The look of your actions would be like this:

```
[install_dependencies] ---> [lint] ---> [test]
```

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

## Tools used

- mocha
- chai
- huskyrc
- lint-staged
- eslint
- Github Actions
