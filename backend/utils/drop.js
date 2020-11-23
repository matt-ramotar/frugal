const mongoose = require('mongoose');

const db = require('../../config/keys').mongoURI;

const { Account, Institution, Item, User } = require('../server/models');

const models = [Account, Institution, Item, User];

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

async function drop() {
  for (const model of models) {
    await model.deleteMany({});
  }

  mongoose.connection.close();
}

drop();

module.exports = drop;
