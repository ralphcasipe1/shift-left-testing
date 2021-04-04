Let's make a naive business requirements.

A user must have a username
A user cannot have a first name without a last name or vice versa.

With this requirements, we can start creating the BDD test.

Scenario: Create a user

GIVEN only the username
THEN he could create

GIVEN the username and first name
BUT no last name
THEN he could not create

GIVEN the username and last name
BUT no first name
THEN he could not create

GIVEN the username, first name, and last name
THEN he could create