const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

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
  }),
});

module.exports = UserType;
