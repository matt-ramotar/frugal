const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const UserType = require('./UserType');
const ItemType = require('./ItemType');
const InstitutionType = require('./InstitutionType');
const AccountType = require('./AccountType');
const BalanceType = require('./BalanceType');

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Institution = mongoose.model('Institution');
const Account = mongoose.model('Account');
const Balance = mongoose.model('Balance');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },

    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      },
    },

    items: {
      type: new GraphQLList(ItemType),
      resolve() {
        return Item.find({});
      },
    },

    item: {
      type: ItemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Item.findById(id);
      },
    },

    institutions: {
      type: new GraphQLList(InstitutionType),
      resolve() {
        return Institution.find({});
      },
    },

    institution: {
      type: InstitutionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Institution.findById(id);
      },
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve() {
        return Account.find({});
      },
    },

    account: {
      type: AccountType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Account.findById(id);
      },
    },

    balances: {
      type: new GraphQLList(BalanceType),
      resolve() {
        return Balance.find({});
      },
    },

    balance: {
      type: BalanceType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Balance.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
