const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const UserType = require('./UserType');
const ItemType = require('./ItemType');
const InstitutionType = require('./InstitutionType');

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Institution = mongoose.model('Institution');

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
  }),
});

module.exports = RootQuery;
