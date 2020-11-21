const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const keys = require('../../config/keys').secretOrKey;

const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

const signup = async data => {
  try {
    const { message, isValid } = validateSignupInput(data);

    if (!isValid) throw new Error(message);

    const { firstName, lastName, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error('This email address is already in use');

    const user = new User({ firstName, lastName, email, password });

    user.save();

    const token = jwt.sign({ id: user._id }, keys);

    return { token, loggedIn: true, ...user._doc, password: null, id: user.id };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) throw new Error(message);

    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) throw new Error('There are no users with that email address');

    const isValidPassword = await bcrypt.compareSync(password, user.password);

    if (!isValidPassword) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.id }, keys);
    return { token, loggedIn: true, ...user._doc, password: null, id: user.id };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { _id } = data;

    const user = await User.findById(_id);

    if (!user) throw new Error('This user does not exist');

    const token = '';

    return { token, loggedIn: false, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys);

    const { id } = decoded;

    const loggedIn = await User.findById(id).then(user => (user ? true : false));

    return { loggedIn, id };
  } catch (err) {
    return { loggedIn: false };
  }
};

const upsertGoogleUser = async data => {
  try {
    const { firstName, lastName, email, password, googleId, picture } = data;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ firstName, lastName, email, password, googleId, picture });
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, keys);

    return { token, loggedIn: true, ...user._doc, id: user.id };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { signup, login, logout, verifyUser, upsertGoogleUser };
