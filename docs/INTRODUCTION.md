# Introduction

## What is Shift-Left Testing

It is an approach to software testing in which testing is performed earlier in software development process.

Shift-left is common in agile development and DevOps, where software development is decomposed to short-duration "sprints". 

The represenation would be like this:
### Tradition Testing
```gherkin
[Planning] -> [Design] -> [Development] -> [Testing] -> [Deployment]
```

### Shift-Left Testing
```gherkin
[Planning] -> [Design] -> [Development] -> [Deployment]
[Testing]<--->[Testing]<->[Testing]
```

## Benefits of Shift-Left Testing
- Decreased development costs.
- Decrease time to market.
- Higher code quality.
- Caught errors early.

## Disadvantage of Shift-Left Testing
Doing this needs an early availability of realistic data. Gathering and making realistic test data often becomes a bottleneck -- eating up the agile productivity gains.

Low-quality test data can cause unreliable test results and low test coverage. This often results in low-quality software delivery, costly rework, undermined delivery crediblity.

## Shift-Left Testing is not a silver bullet
Shifting-Right testing strategy is viable when you:
- Enhance customer experience
- Provide scope for implementation of test automation
- Ensure better test coverage
- Continuous feedback from users to help handle software failures
- Creating hypthesis by trying out new solutions (A/B Testing)
- Closely collaborating with customers to determine what is working instead of assuming that the delivered feature(s) is working and following the business requirements.

## When to apply Shift-Left Testing
- When planning and designing on a feature.
- When the feature is testable but not fully completed yet.
- When you want to have a foundation on your automation testing.

## When to let go on Shift-Left and move to Shift-Right Testing
- When you want feedback from your customer to enhance on how you handle failures (Chaos Engineering & Site Reliability Testing) or try out new solutions (A/B Testing).
- Ensurance for the coverage of the tests.

## How do to Shift-Left
- Plan with the business, developers and testers
- Make developers responsible for testing
- Teach testers to code
- Make use of CI/CD Pipeline
- Make use of BDD Testing


## Tutorial
I would like to have a short on Shift-Left Testing for the developer's perspective

These tutorial will not discuss about architecture and security.

In this tutorial we will create a dead simple small app. We will adhere to these guidelines:

- Follow the current best practices
- Maintain code quality via linting
- Engage ourselves in shift-left testing
- Use github actions for our CI
- Do TDD (not religiously) via unit testing
- Do test coverage
- Write acceptance criteria for our BDD Testing

This tutorial will later on update to cater tester's perspective.

Don't follow this tutorial precisely, this tutorial's scope is to allow our feet get wet, and feel how could we adopt shift-left testing to our organization or project.

For those who are reading this, I assume you have a basic knowledge in NodeJS and Git. I will try my best to make this for absolute beginners also.

GO TO [Initial Setup](https://github.com/ralphcasipe1/shift-left-testing/blob/main/docs/INITIALIZING_SETUP.md)