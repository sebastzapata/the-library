const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

const typeDefs = `
    type Query {
        hello: String
        Books: [Book]    
        getBook(_id: ID): Book    
    }

    enum Status {
        LENT
        AVAILABLE
        UNAVAILABLE
    }

    type Book {
        _id: ID
        title: String!
        author: String!
        pages: Int!
        status: Status!
    }

    type Mutation {
        createBook(input: BookInput): Book
        updateBook(_id: ID, input: BookInput): Book
        partialUpdateBook(_id: ID, input: patchBookInput): Book
        deleteBook(_id: ID): Book
    }

    input BookInput {
        title: String!
        author: String!
        pages: Int!
        status: Status!
    }

    input patchBookInput {
        title: String
        author: String
        pages: Int
        status: Status
    }
`;

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
