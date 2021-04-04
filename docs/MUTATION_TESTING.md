## Exploring outside code coverage using mutants
```bash
npm i -D @stryker-mutator/core
```

Run this command
```bash
npx stryker init

[X] None/other
[X] mocha
[X] html, clear-text, progress
[X] JSON
```

Run this command:
```bash
npx stryker run
```

You will see this:
```bash
Ran 1.25 tests per mutant on average.
-------------|---------|----------|-----------|------------|----------|---------|
File         | % score | # killed | # timeout | # survived | # no cov | # error |
-------------|---------|----------|-----------|------------|----------|---------|
All files    |  100.00 |        4 |         0 |          0 |        0 |       0 |
 add.js      |  100.00 |        2 |         0 |          0 |        0 |       0 |
 subtract.js |  100.00 |        2 |         0 |          0 |        0 |       0 |
-------------|---------|----------|-----------|------------|----------|---------|
```

## Apply mutation testing in workflows Github Actions
Update your `.github/workflows/action.yml` by adding `npx stryker run` in `test_coverage` job:
```yml
test_coverage:
    needs: lint
    runs-on: ubuntu-20.04
    steps:
      ...
      - name: Run Test Coverage
        run: npm run coverage
      - name: Run Mutation Testing
        run: npx stryker run
```

This is the current `.github/workflows/action.yml`:
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
  
  test_coverage:
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
      - name: Run Test Coverage
        run: npm run coverage
      - name: Run Mutation Testing
        run: npx stryker run
```

GO TO [Increase Reponsiveness with Slack and Github Actions](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/SLACK_ACTIONS.md)