const Book = require("../models/Book");

const getBooks = () => Book.find({});

const getBook = (id) => Book.findById(id);

const createBook = ({ title, author, pages, status }) => {
  const book = new Book({
    title,
    author,
    pages,
    status,
  });
  return book.save();
};

const updateBook = (id, { title, author, pages, status }) => {
  const book = Book.findByIdAndUpdate(
    id,
    { title, author, pages, status },
    {
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
