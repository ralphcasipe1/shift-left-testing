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

`infrastructure/mongoose-connection.js`
```js
const mongoose = require('mongoose');

async function connect() {
  return mongoose.connect('mongodb://localhost/dead-simple', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connect,
};
```

`src/app.js`
```js
const Koa = require('koa');
const Router = require('koa-router');
const R = require('ramda');
const bodyParser = require('koa-bodyparser');
const { customAlphabet } = require('nanoid');
const { Schema, model } = require('mongoose');

const mongooseConnection = require('./infrastructure/mongoose-connection');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

(async () => mongooseConnection.connect())();

const UserModel = model(
  'user',
  new Schema({
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
  }),
);

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

router.get('/users', async (ctx) => {
  ctx.body = {
    users: await UserModel.find({}, { __v: 0 }).lean(),
  };
});

router.post('/users', async (ctx) => {
  try {
    /* if (!ctx.request.body.username) {
      throw new Error('Username is not supplied!');
    }

    if (ctx.request.body.firstName && !ctx.request.body.lastName) {
      throw new Error('Last name should be supplied when the first name is!');
    }

    if (!ctx.request.body.firstName && ctx.request.body.lastName) {
      throw new Error('First name should be supplied when the last name is!');
    } */

    const user = await UserModel.create({
      ...ctx.request.body,
      _id: nanoid(),
    });

    ctx.body = {
      user: R.pick(['username', 'firstName', 'lastName', '_id'])(user),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      message: error.message,
    };
  }
});

app.use(router.routes());

module.exports = app;
```
> Try to one by one uncomment the conditional statement (`if (..) { ... }`). To pass the skipped tests. This will help you appreciate more when designing the test first base on business requirements and apply your logical implementation while doing tweaks to your tests at the same time.

`index.js`
```js
const app = require('./app');

const server = app.listen(3001, () => {
  console.log('Listening to 3001.');
});

module.exports = server;
```

### Async/Await Functions
This is a simple representation of async/await functions.

![async-represenation](../assets/async-await.jpg)

## THE END