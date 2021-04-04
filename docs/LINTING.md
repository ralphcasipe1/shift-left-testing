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
```

The look of your actions would be like this:

```
[install_dependencies] ---> [lint] ---> [test]
```
