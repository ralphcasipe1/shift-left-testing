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
