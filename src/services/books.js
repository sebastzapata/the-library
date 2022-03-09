const logger = require('@condor-labs/logger');
const Book = require('../models/Book');
const util = require('util');
const { bookValidationSchema, patchBookValidationSchema } = require('../validations/books');

const { settings } = require('../../constants');
const redis = require('@condor-labs/redis')(settings);

const getBooks = async () => {
  const books = await Book.find();
  return books;
};

const getBook = async (id) => {
  try {
    const client = await redis.getClient();
    client.get = util.promisify(client.get);
    const cachedBook = await client.get(id);

    if (cachedBook) {
      return JSON.parse(cachedBook);
    }

    const book = await Book.findById(id);

    await client.set(id, JSON.stringify(book));
    return book;
  } catch (error) {
    logger.err(error);
  }
};

const createBook = async ({ title, author, pages, status }) => {
  const validationResult = await bookValidationSchema.validate({
    title,
    author,
    pages,
    status,
  });
  if (validationResult.error) {
    return validationResult.error;
  }
  const book = await Book.create({ title, author, pages, status });
  return book;
};

const updateBook = async (id, { title, author, pages, status }) => {
  try {
    const client = await redis.getClient();
    const validationResult = await bookValidationSchema.validate({
      title,
      author,
      pages,
      status,
    });
    if (validationResult.error) {
      return validationResult.error;
    }
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, pages, status },
      {
        upsert: true,
        runValidators: true,
        new: true,
        overwrite: true,
      }
    );
    client.del(id);
    return book;
  } catch (error) {
    logger.err(error);
  }
};

const partialUpdateBook = async (id, data) => {
  try {
    const client = await redis.getClient();
    const validationResult = await patchBookValidationSchema.validate(data);
    if (validationResult.error) {
      return validationResult.error;
    }

    const { title } = data;
    const exists = await Book.findOne({ title: title });
    if (exists) {
      return { error: `Title ${title} already exists` };
    }

    const book = Book.findByIdAndUpdate(id, data, {
      new: true,
    });

    client.del(id);
    return book;
  } catch (error) {
    logger.err(error);
  }
};

const deleteBook = async (id) => {
  try {
    const client = await redis.getClient();
    const book = await Book.findByIdAndDelete(id);
    client.del(id);
    return book;
  } catch (error) {
    logger.err(error);
  }
};

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  partialUpdateBook,
};
