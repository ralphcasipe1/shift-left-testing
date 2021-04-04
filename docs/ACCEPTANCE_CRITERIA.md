Let's make a naive business requirements.

- A user must have a username
- A user cannot have a first name without a last name or vice versa.

With this requirements, we can start creating the BDD test.

```gkerkin
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
```

By having this acceptance criteria test we could start first by testing the endpoint for creation by writing a test.

```js
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../src');

chai.use(chaiHttp);

const { expect } = chai;

describe('User endpoints', function () {
  before(function () {
    this.request = () => chai.request(server);
  });

  describe('POST /users', function () {
    it('should create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        username: 'test',
      });

      expect(this.response.status).to.equal(200);

      expect(this.response.body).to.have.a.property('user');

      expect(this.response.body.user._id).to.match(/[0-9A-Z]{10}/);

      expect(this.response.body.user.username).to.equals('test');
    });

    it('should create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        username: 'test',
        firstName: 'test',
        lastName: 'test',
      });

      expect(this.response.status).to.equal(200);

      expect(this.response.body).to.have.a.property('user');

      expect(this.response.body.user._id).to.match(/[0-9A-Z]{10}/);

      expect(this.response.body.user.username).to.equals('test');
    });

    it('should not create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        firstName: 'test',
        lastName: 'test',
      });

      expect(this.response.body.message).to.equals('Username is not supplied!');
    });

    it('should not create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        username: 'test',
        firstName: 'test',
      });

      expect(this.response.body.message).to.equals(
        'Last name should be supplied when the first name is!',
      );
    });

    it.skip('should not create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        username: 'test',
        lastName: 'test',
      });

      expect(this.response.body.message).to.equals(
        'First name should be supplied when the last name is!',
      );
    });
  });

  describe.skip('GET /users', function () {
    it('shoud list', async function () {
      this.response = await this.request().get('/users').type('json').send();

      expect(this.response.body).to.have.property('users').and.an('array');

      expect(this.response.body.users[0]).to.have.keys([
        '_id',
        'username',
        'firstName',
        'lastName',
      ]);

      expect(this.response.body.users[0]._id).to.match(/[0-9A-Z]{10}/);
    });
  });
});
```

### Async/Await Functions
![async-represenation](../assets/async-await.jpg)

## THE END