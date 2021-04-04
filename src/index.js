const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongooseConnection = require('./infrastructure/mongoose-connection');

const app = new Koa();
const router = new Router();

(async () => mongooseConnection.connect())();

app.use(bodyParser());

router.get('/users', async function (ctx) {
  ctx.body = {
    users: [],
  };
});

router.post('/users', async function (ctx) {
  ctx.request.body = { name: 'John' };

  ctx.body = { user: { name: 'John' } };
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('Listening to 3000.');
});
