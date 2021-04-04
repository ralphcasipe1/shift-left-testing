## Code Coverage
Install nyc for code coverage tool
```
npm i -D nyc
```

Add `.nycrc` in your your root project folder.
Add these configuration in `.nycrc`
```json
{
  "all": true,
  "check-coverage": true,
  "reporter": ["lcov", "text-summary"],
  "watermarks": {
    "lines": [60, 80],
    "functions": [80, 95],
    "branches": [60, 80],
    "statements": [80, 95]
  }
}
```

Add `coverage` script in `package.json`.

```json
"scripts": {
  "test": "mocha",
  "coverage": "nyc npm run test",
  ....
},
```

Ignore `coverage` and `.nyc_output`

## Add coverage job workflow github actions
In `./github/workflows/action.yml`

```yml
test:
  .....

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
      - name: Run tests
        run: npm run coverage
```

This will be the current `action.yml`:

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
      - name: Run tests
        run: npm run coverage
```