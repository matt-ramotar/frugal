const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const AuthService = require('../services/auth');
const ItemService = require('../services/item');

const ItemType = require('./schema/ItemType');

const UserType = require('./schema/UserType');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.signup(args);
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.login(args);
      },
    },

    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(_, args) {
        return AuthService.logout(args);
      },
    },

    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      },
    },

    upsertGoogleUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        googleId: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.upsertGoogleUser(args);
      },
    },

    addItem: {
      type: ItemType,
      args: {
        itemId: { type: GraphQLID },
        accessToken: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(_, args) {
        return ItemService.addItem(args);
      },
    },
  },
});

module.exports = mutation;
