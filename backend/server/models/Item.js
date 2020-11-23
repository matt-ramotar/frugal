const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  plaidItemId: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accessToken: { type: String },
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
});

module.exports = mongoose.model('Item', ItemSchema);
