const graphql = require('graphql');
const { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const mongoose = require('mongoose');
const UserType = require('./UserType');
const User = mongoose.model('user');
const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        date: { type: GraphQLString },
        userId: { type: GraphQLString },
        likes: { type: GraphQLInt },
        likedMembers: { type: new GraphQLList(GraphQLString) },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                return findUser(parentValue.userId);
            }
        }
    })
});
async function findUser(id) {
    const user = await User.findById(id);
    return user;
}
module.exports = CommentType;