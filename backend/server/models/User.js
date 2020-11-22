const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },

  googleId: { type: String },
  picture: { type: String },

  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
});

UserSchema.pre('save', function (next) {
  const user = this;

  // Only hash the password if it is new or has been modified
  if (!user.isModified('password')) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hash the password using new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
