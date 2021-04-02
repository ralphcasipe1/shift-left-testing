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

## Apply linting job in workflow github actions