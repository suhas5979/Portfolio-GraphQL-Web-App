const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql');
const mongoose = require('mongoose');
const UserType = require('./types/UserType');
const CommentType = require('./types/CommentType');
const User = mongoose.model('user');
const passport = require('passport');
const Comment = mongoose.model('comment');
// const users =[
//     {id:'22',name:'suhas',age:20},
//     {id:'10',name:'suhas suryavanshi',age:22}
// ]


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                return user;
            }
        },
        allComments: {
            type: new GraphQLList(CommentType),
            resolve(parentValue, args) {
                return allComments();
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        logOut: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req;
                req.logout();
                return user;
            }
        },
        addComment: {
            type: CommentType,
            args: {
                text: { type: GraphQLString },
                userId: { type: GraphQLString }
            },
            resolve(parentValue, { text, userId }) {
                return addComment(text, userId);
            }
        },
        likeComment: {
            type: CommentType,
            args: {
                id: { type: GraphQLString },
                user: { type: GraphQLString },
                payload: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                return likeComment(args.id, args.user, args.payload);
            }

        }
    }
});
async function addComment(text, userId) {
    const comment = new Comment({ text, userId });
    await comment.save();
    return comment;
}
async function likeComment(id, user, payload) {
    await Comment.findByIdAndUpdate(id, { $set: { likes: payload}, $push: { likedMembers: user } }, (err, res) => {
        if (err) {
            throw new Error({ message: "cannot update comment likes" });
        }
    });
    const res = await Comment.findById(id)
    return res;
}
async function allComments() {
    const comments = await Comment.find();
    return comments;
}
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})