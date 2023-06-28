import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
             _id
             username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook ($title: String!, $authors: [String]!, $description: String!, $bookId: String, $image: String, $link: String) {
        saveBook (title: $title, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link) {
            _id
            username
            savedBooks{
                title
                authors
                description
                bookId
                image
                link
            }
        }
    }    
`;

export const DELETE_BOOK = gql`
    mutation deleteBook ($bookId: String!) {
        deleteBook (bookId: $bookId) {
            _id
            username
            savedBooks{
                title
                authors
                description
                bookId
                image
                link
            }
        }
    }`