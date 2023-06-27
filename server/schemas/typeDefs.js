const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]!
}

    type Book {
        _id: ID!
        authors: [String]!
        description: String!
        image: String
        link: String
        title: String!
    }

   type Auth {
    token: ID!
    user: User
   } 

   type Query {
    user:(username: String! || id: ID!): User    
   }

   type Mutation {
    createUser(username: String!, email String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    saveBook(title: String!, authors:[String]!, description: String!): Book
    deleteBook(bookId: ID!): Book
   }
`;

module.exports = typeDefs