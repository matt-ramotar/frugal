const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
  name: { type: String },
  picture: { type: String },
});

module.exports = mongoose.model('Institution', InstitutionSchema);
