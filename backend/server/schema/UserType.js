const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const ItemType = require('./ItemType');
const AccountType = require('./AccountType');

const User = mongoose.model('User');

const UserType = new GraphQLObjectType({
  name: 'User',

  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },

    googleId: { type: GraphQLString },
    picture: { type: GraphQLString },
    token: { type: GraphQLString },

    items: {
      type: new GraphQLList(ItemType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate('items')
          .then(user => user.items);
      },
    },

    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate('accounts')
          .then(user => user.accounts);
      },
    },
  }),
});

module.exports = UserType;
