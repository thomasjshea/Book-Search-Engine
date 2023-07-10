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
            const user = await User.findOne({ username: username });
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
        saveBook: async(parent, { title, authors, description, bookId, image, link }, context) => {
            // console.log(context)
            try {
                const user = await User.findOneAndUpdate(
                     { _id: context.user._id},
                     {
                         $addToSet: { savedBooks: {
                             title,  
                             authors,
                             description,
                             bookId,
                             image,
                             link                        
                         } }
                     }
                 );

                 console.log(user)
                 return user
            } catch (err){
                if (err) throw err
            }
        },
        deleteBook: async(parent, { bookId }, context) => {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $pull: { savedBooks: bookId }
                }
            )
        },
    },
};

module.exports = resolvers