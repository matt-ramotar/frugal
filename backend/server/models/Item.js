const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accessToken: { type: String },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
});

module.exports = mongoose.model('Item', ItemSchema);
