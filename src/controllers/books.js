const { getBooks, getBook, createBook, updateBook, deleteBook, partialUpdateBook } = require('../services/books');

const getBooksApi = async (req, res, next) => {
  try {
    const books = await getBooks();
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

const getBookApi = async (req, res, next) => {
  try {
    const { id: bookID } = req.params;
    const book = await getBook(bookID);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const createBookApi = async (req, res, next) => {
  try {
    const book = await createBook(req.body);
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const updateBookApi = async (req, res, next) => {
  try {
    const { id: bookID } = req.params;
    const book = await updateBook(bookID, req.body);
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const partialUpdateBookApi = async (req, res, next) => {
  try {
    const { id: bookID } = req.params;
    const book = await partialUpdateBook(bookID, req.body);
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const deleteBookApi = async (req, res, next) => {
  try {
    const { id: bookID } = req.params;
    const book = await deleteBook(bookID);
    if (!book) {
      return res.status(404).send();
    }
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookApi,
  getBooksApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
  partialUpdateBookApi,
};
