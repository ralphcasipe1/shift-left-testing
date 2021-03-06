## Adding more responsiveness in workflows Github Actions
We should add more capability when it comes to responsiveness of our Github Actions. We can take advantage of using Slack.
This kind of process is a culture called ChatOps.
We are just going to implement a very simple one.

First, add this to your `.github/workflows/action.yml` under the `test` and `test_coverage` job

```yml
test:
  steps:
    ...
    - name: Run tests
      .....
    - uses: 8398a7/action-slack@v3
            with:
              status: custom
              fields: workflow,job,commit,repo,ref,author,took
              custom_payload: |
                {
                  attachments: [{
                    color: '${{ job.status }}' === 'success' ? 'good' : '${{ job.status }}' === 'failure' ? 'danger' : 'warning',
                    text: `${process.env.AS_WORKFLOW}\n${process.env.AS_JOB} (${process.env.AS_COMMIT}) of ${process.env.AS_REPO}@${process.env.AS_REF} by ${process.env.AS_AUTHOR} ${{ job.status }} in ${process.env.AS_TOOK}`,
                  }]
                }
            env:
              SLACK_WEBHOOK_URL: https://hooks.slack.com/services/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
            if: always() 

test_coverage:
    needs: lint
    runs-on: ubuntu-20.04
    steps:
      .....
      - name: Run Test Coverage
        run: npm run coverage
      - name: Run Mutation Testing
        run: npx stryker run
      - uses: 8398a7/action-slack@v3
        with:
          status: custom
          fields: workflow,job,commit,repo,ref,author,took
          custom_payload: |
            {
              attachments: [{
                color: '${{ job.status }}' === 'success' ? 'good' : '${{ job.status }}' === 'failure' ? 'danger' : 'warning',
                text: `${process.env.AS_WORKFLOW}\n${process.env.AS_JOB} (${process.env.AS_COMMIT}) of ${process.env.AS_REPO}@${process.env.AS_REF} by ${process.env.AS_AUTHOR} ${{ job.status }} in ${process.env.AS_TOOK}`,
              }]
            }
        env:
          SLACK_WEBHOOK_URL: https://hooks.slack.com/services/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
        if: always()
```


The overall result of the `.github/workflows/action.yml`
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
      - uses: 8398a7/action-slack@v3
        with:
          status: custom
          fields: workflow,job,commit,repo,ref,author,took
          custom_payload: |
            {
              attachments: [{
                color: '${{ job.status }}' === 'success' ? 'good' : '${{ job.status }}' === 'failure' ? 'danger' : 'warning',
                text: `${process.env.AS_WORKFLOW}\n${process.env.AS_JOB} (${process.env.AS_COMMIT}) of ${process.env.AS_REPO}@${process.env.AS_REF} by ${process.env.AS_AUTHOR} ${{ job.status }} in ${process.env.AS_TOOK}`,
              }]
            }
        env:
          SLACK_WEBHOOK_URL: {{ YOUR SLACK WEBHOOK }}
        if: always()
  
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
      - uses: 8398a7/action-slack@v3
        with:
          status: custom
          fields: workflow,job,commit,repo,ref,author,took
          custom_payload: |
            {
              attachments: [{
                color: '${{ job.status }}' === 'success' ? 'good' : '${{ job.status }}' === 'failure' ? 'danger' : 'warning',
                text: `${process.env.AS_WORKFLOW}\n${process.env.AS_JOB} (${process.env.AS_COMMIT}) of ${process.env.AS_REPO}@${process.env.AS_REF} by ${process.env.AS_AUTHOR} ${{ job.status }} in ${process.env.AS_TOOK}`,
              }]
            }
        env:
          SLACK_WEBHOOK_URL: {{ YOUR SLACK WEBHOOK }}
        if: always()
```

GO TO [Creating Acceptance Criteria](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/ACCEPTANCE_CRITERIA.md)