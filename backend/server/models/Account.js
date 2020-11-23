const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  plaidAccountId: { type: String },
  mask: { type: Number },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
  officialName: { type: String },
  type: { type: String },
  subtype: { type: String },
  balance: { type: Schema.Types.ObjectId, ref: 'Balance' },
});

module.exports = mongoose.model('Account', AccountSchema);
