const mongoose = require('mongoose');
const graphql = require('graphql');

const InstitutionType = require('./InstitutionType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const Institution = mongoose.model('Institution');

const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: GraphQLID },
    mask: { type: GraphQLInt },

    institution: {
      type: InstitutionType,
      resolve(parentValue) {
        return Institution.findById(parentValue.institution)
          .then(institution => institution)
          .catch(err => null);
      },
    },

    officialName: { type: GraphQLString },
    type: { type: GraphQLString },
    subtype: { type: GraphQLString },
  }),
});

module.exports = AccountType;
