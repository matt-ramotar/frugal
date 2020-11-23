const mongoose = require('mongoose');
const getAccounts = require('../helpers/getAccounts');

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Account = mongoose.model('Account');

const addItem = async data => {
  try {
    console.log(data);
    const { userId, itemId, accessToken } = data;

    const user = await User.findById(userId);

    const item = await Item.create({
      plaidItemId: itemId,
      user: user.id,
      accessToken,
    });

    await user.items.push(item);

    const accounts = await getAccounts(accessToken);

    for (const account of accounts) {
      const { account_id, mask, official_name, subtype, type } = account;

      const newAccount = await Account.create({
        plaidAccountId: account_id,
        mask,
        officialName: official_name,
        subtype,
        type,
      });

      user.accounts.push(newAccount);
    }

    await user.save();

    return { _id: item.id, user, accessToken };
  } catch (err) {
    throw err;
  }
};

module.exports = { addItem };
