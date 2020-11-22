const mongoose = require('mongoose');
const graphql = require('graphql');
const UserType = require('./UserType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const Item = mongoose.model('Item');
const User = mongoose.model('User');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
          .catch(err => null);
      },
    },
    accessToken: { type: GraphQLString },
  }),
});

module.exports = ItemType;
