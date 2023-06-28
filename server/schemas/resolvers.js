const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({ _id: context.user._id}).populate('books')
            }
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args); 
            const token = signToken(user)
            return { user, token }
        },
        login: async (parent, { username,  password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user)
            return { token, user}
        },
        saveBook: async(parent, args) => {
            const book = await Book.create(args);

            await User.findOneAndUpdate(
                { title: title },
                { authors: authors},
                { description: description },
                {
                    $addToSet: { savedBooks: book._id }
                }
            );
        },
        deleteBook: async(parent, { bookId }) => {
            return Book.findOneAndDelete({ _id: bookId });
        },
    },
};

module.exports = resolvers