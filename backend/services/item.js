const mongoose = require('mongoose');

const User = mongoose.model('User');
const Item = mongoose.model('Item');

const addItem = async data => {
  try {
    const { userId, itemId, accessToken } = data;

    const user = await User.findById(userId);

    const item = await Item.create({
      _id: itemId,
      user: user.id,
      accessToken,
    });

    console.log(user);

    await user.items.push(item);
    await user.save();
    console.log(user);

    return { _id: item.id, user, accessToken };
  } catch (err) {
    throw err;
  }
};

module.exports = { addItem };
