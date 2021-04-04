const app = require('./app');

const server = app.listen(3001, () => {
  console.log('Listening to 3001.');
});

module.exports = server;
