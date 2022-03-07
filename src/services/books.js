const Book = require("../models/Book");

const getBooks = () => {
  const books = Book.find();
  return books;
};

const getBook = (id) => {
  const book = Book.findById(id);
  return book;
};

const createBook = ({ title, author, pages, status }) => {
  const book = Book.create({ title, author, pages, status });
  return book;
};

const updateBook = (id, { title, author, pages, status }) => {
  const book = Book.findByIdAndUpdate(
    id,
    { title, author, pages, status },
    {
      upsert: true,
      runValidators: true,
      new: true,
    }
  );
  return book;
};

const deleteBook = (id) => {
  const book = Book.findByIdAndDelete(id);
  return book;
};

module.exports = { getBook, getBooks, createBook, updateBook, deleteBook };
