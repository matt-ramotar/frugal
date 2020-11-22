const mongoose = require('mongoose');
const graphql = require('graphql');
const UserType = require('./UserType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const InstitutionType = new GraphQLObjectType({
  name: 'Institution',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

module.exports = InstitutionType;
