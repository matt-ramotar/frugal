const mongoose = require('mongoose');
const graphql = require('graphql');
const AccountType = require('./AccountType');
const Account = mongoose.model('Account');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const BalanceType = new GraphQLObjectType({
  name: 'Balance',
  fields: () => ({
    id: { type: GraphQLID },
    available: { type: GraphQLFloat },
    current: { type: GraphQLFloat },
    limit: { type: GraphQLFloat },
    account: {
      type: AccountType,
      resolve(parentValue) {
        return Account.findById(parentValue.account)
          .then(account => account)
          .catch(err => null);
      },
    },
  }),
});

module.exports = BalanceType;
