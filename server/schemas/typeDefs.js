const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]!
}

    type Book {
        bookId: String!
        authors: [String]!
        description: String!
        title: String!
        image: String
        link: String
    }

   type Auth {
    token: ID!
    user: User
   } 

   type Query {
    me: User    
   }

   type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    saveBook(title: String!, authors:[String]!, description: String!, bookId: String, image: String, link: String): User
    deleteBook(bookId: String!): User
   }
`;

module.exports = typeDefs