const mongoose = require('mongoose');
const graphql = require('graphql');

const AccountType = require('./AccountType');
const InstitutionType = require('./InstitutionType');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;

const Item = mongoose.model('Item');
const User = mongoose.model('User');
const Institution = mongoose.model('Institution');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },

    accessToken: { type: GraphQLString },

    institution: {
      type: InstitutionType,
      resolve(parentValue) {
        return Institution.findById(parentValue.institution)
          .then(institution => institution)
          .catch(err => null);
      },
    },

    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parentValue) {
        return Item.findById(parentValue.id)
          .populate('accounts')
          .then(item => item.accounts);
      },
    },
  }),
});

module.exports = ItemType;
