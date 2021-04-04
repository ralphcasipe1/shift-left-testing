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

GO TO [Linting](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/LINTING.md)