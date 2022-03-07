const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./services/books");

const getBooksApi = async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

const getBookApi = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await getBook(bookID);
    if (!book) return next("Not Found");
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const createBookApi = async (req, res) => {
  try {
    const book = await createBook(req.body);
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const updateBookApi = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await updateBook(bookID, req.body);
    if (!book) return next("Not found");
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const deleteBookApi = async (req, res) => {
  try {
    const { id: bookID } = req.params;
    const book = await deleteBook(bookID);
    if (!book) return next("Not found");
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
};
