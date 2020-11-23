const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
  available: { type: Number },
  current: { type: Number },
  limit: { type: Number },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
});

module.exports = mongoose.model('Balance', BalanceSchema);
