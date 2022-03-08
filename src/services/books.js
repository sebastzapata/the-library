const Book = require("../models/Book");
const {
  bookValidationSchema,
  patchBookValidationSchema,
} = require("../validations/books");

const getBooks = () => {
  const books = Book.find();
  return books;
};

const getBook = (id) => {
  const book = Book.findById(id);
  return book;
};

const createBook = ({ title, author, pages, status }) => {
  const validationResult = bookValidationSchema.validate({
    title,
    author,
    pages,
    status,
  });
  if (validationResult.error) return validationResult.error;
  const book = Book.create({ title, author, pages, status });
  return book;
};

const updateBook = (id, { title, author, pages, status }) => {
  const validationResult = bookValidationSchema.validate({
    title,
    author,
    pages,
    status,
  });
  if (validationResult.error) return validationResult.error;
  const book = Book.findByIdAndUpdate(
    id,
    { title, author, pages, status },
    {
      upsert: true,
      runValidators: true,
      new: true,
      overwrite: true,
    }
  );
  return book;
};

const partialUpdateBook = async (id, data) => {
  const validationResult = patchBookValidationSchema.validate(data);
  if (validationResult.error) return validationResult.error;
  const { title } = data;
  const exists = await Book.findOne({ title: title });
  if (exists) return { error: `Title ${title} already exists` };
  const book = Book.findByIdAndUpdate(id, data, {
    new: true,
  });
  return book;
};

const deleteBook = (id) => {
  const book = Book.findByIdAndDelete(id);
  return book;
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  partialUpdateBook,
};
