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
    if (!ctx.request.body.username) {
      throw new Error('Username is not supplied!');
    }

    if (ctx.request.body.firstName && !ctx.request.body.lastName) {
      throw new Error('Last name should be supplied when the first name is!');
    }

    if (!ctx.request.body.firstName && ctx.request.body.lastName) {
      throw new Error('First name should be supplied when the last name is!');
    }

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
