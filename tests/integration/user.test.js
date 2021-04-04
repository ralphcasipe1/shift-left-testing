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

    it('should not create', async function () {
      this.response = await this.request().post('/users').type('json').send({
        username: 'test',
        lastName: 'test',
      });

      expect(this.response.body.message).to.equals(
        'First name should be supplied when the last name is!',
      );
    });
  });

  describe('GET /users', function () {
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
