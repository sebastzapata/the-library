const { getBooks, getBook, createBook, updateBook, deleteBook, partialUpdateBook } = require('../services/books');

const resolvers = {
  Query: {
    hello() {
      return 'Hello world with graphql';
    },
    async Books() {
      const books = await getBooks();
      return books;
    },
    async getBook(root, { _id }) {
      const book = await getBook(_id);
      return book;
    },
  },
  Mutation: {
    async createBook(_, { input }) {
      const newBook = await createBook(input);
      return newBook;
    },
    async updateBook(_, { _id, input }) {
      const updatedBook = await updateBook(_id, input);
      return updatedBook;
    },
    async partialUpdateBook(_, { _id, input }) {
      const updatedBook = await partialUpdateBook(_id, input);
      return updatedBook;
    },
    async deleteBook(_, { _id }) {
      const deletedBook = await deleteBook(_id);
      return deletedBook;
    },
  },
};

module.exports = resolvers;
