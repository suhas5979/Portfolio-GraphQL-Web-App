const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
// const mongoose = require('mongoose');
// const User = mongoose.model('user'); 

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        profileUrl: { type: GraphQLString },
        googleId: { type: GraphQLString }
    })

});

module.exports = UserType;