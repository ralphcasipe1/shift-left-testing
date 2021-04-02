# Shift-Left testing

In this section we will create a dead simple small app. We will adhere to these guidelines:
- Follow the current best practices
- Engage ourselves in shift-left testing
- Use github actions for our CI
- Do TDD (not religiously) via unit testing
- Do test coverage
- Write acceptance criteria for our BDD Testing
- Do minimal chaos engineering

For those who aare reading this, I assume you have a basic knowledge in NodeJS and Git. I will try my best to make this friendly for absolute begineers also.

### Create a folder and named it as `shift-left-testing`.

Inside the folder, `shift-left-testing`, run this command:

```bash
npm init -y
```

It will generate a `package.json` inside the folder.

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