## Initializing NodeJS project

### Create a folder and named it as `shift-left-testing`.

Inside the folder, `shift-left-testing`, run this command:

```bash
npm init -y
```

It will generate a `package.json` inside the folder.

## Initial Test

### Install tools for testing

`Code 1.1`
```bash
npm i -D mocha chai
```
> `Code 1.1`: Installs `mocha` and `chai` for testing

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

`add.test.js`
`Code 1.2`
```js
const { expect } = require('chai');

const add = require('./add');

describe('add', () => {
  it('should have the correct sum', () => {
    expect(add(2, 2)).to.equals(4);
  });
});
```

`subtract.test.js`
`Code 1.3`
```js
describe('subtract', () => {
  it('should have the correct difference', () => {
    expect(subtract(2, 1)).to.equals(1);
  });
});
```

try to pass these tests, add your code in `add.js` and `subtract.js`, respectively.


## Initial commit

For now, let's try committing our code using `git`.

Follow the instructions:

`Code 1.4`
```bash
git init
```
> `Code 1.4`: This would initialize that this project can be use with `git`.

`Code 1.5`
```bash
git status
```
> `Code 1.5`: This would show all the files affected in your project.

Make sure to ignore `node_modules`, By creating `.gitignore` inside the root of the project folder.

Write `node_modules` inside `.gitignore`, For example:

`.gitignore`
```git
node_modules
```

Run the `git status` again. You would see the `node_modules` is ignored.

We have to commit all our changes first as an **initial commit**.

`Code 1.6`
```
git add .
```
> `Code 1.6`: Add all files that are excluded from `.gitignore` to staging (files for commit)

`Code 1.7`
```
git commit -m "initial commit"
```
> `Code 1.7`: Add message to the files that are in staging. In our case we commit it all and labeled it as our first commit to our project.

`Code 1.8`
```
git branch -M main
```
> `Code 1.8`: Our current branch is named, `master`. With this command we will change our branch name to `main`.

Now you're ready to add the initial implementation on your GitHub.

`Code 1.9`
```bash
git remote add origin https://github.com/<your-username>/shift-left-testing.git
```
> `Code 1.9`: We will link our changes to a remote server, a cloud-based one, which in our case, it's **GITHUB**.

> `Code 1.10`
```
git push -u origin main
```
> `Code 1.10`: We will push our changes to the link we specified earlier.

# 🎊🎉🎉 CHEERS ‼️‼️

GO TO [First step to Github Actions](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/INITIAL_GITHUB_ACTIONS.md)