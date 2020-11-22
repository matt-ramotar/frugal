require('dotenv').config();
const plaid = require('plaid');
const router = require('express').Router();

const { clientID, secret, publicKey, env } = require('../../../config').plaid;

const plaidClient = new plaid.Client({
  clientID,
  secret,
  env: plaid.environments[env],
  options: { version: '2019-05-29' },
});

router.post('/create_link_token', async (req, res, next) => {
  const { userId } = req.body;

  const linkTokenResponse = await plaidClient.createLinkToken({
    user: {
      client_user_id: userId,
    },
    client_name: 'frugal',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
  });

  const linkToken = linkTokenResponse.link_token;
  console.log(linkToken);
  res.json({ linkToken });
});

router.post('/exchange_public_token', async (req, res) => {
  const { publicToken } = req.body;
  const exchange = await plaidClient.exchangePublicToken(publicToken).catch(err => console.log(err));
  const accessToken = exchange.access_token;
  const itemId = exchange.item_id;
  console.log(accessToken, itemId);
});

module.exports = router;
