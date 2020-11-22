require('dotenv').config();
const plaid = require('plaid');
const { clientID, secret, env } = require('../../config').plaid;

async function getAccounts(accessToken) {
  const plaidClient = new plaid.Client({
    clientID,
    secret,
    env: plaid.environments[env],
    options: { version: '2019-05-29' },
  });

  const { accounts } = await plaidClient.getAuth(accessToken, {}).catch(err => console.log(err));

  return accounts;
}

module.exports = getAccounts;
