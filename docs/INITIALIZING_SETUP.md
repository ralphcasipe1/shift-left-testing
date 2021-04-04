## Initializing NodeJS project

### Create a folder and named it as `shift-left-testing`.

Inside the folder, `shift-left-testing`, run this command:

```bash
npm init -y
```

It will generate a `package.json` inside the folder.

## Initial Test

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

For now, let's try committing our code using `git`.

Follow the instructions:

`Code 1.1`
```bash
git init
```
`Code 1.1`: This would initialize that this project can be use with `git`.

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

GO TO [First step to Github Actions](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/INITIAL_GITHUB_ACTIONS.md)