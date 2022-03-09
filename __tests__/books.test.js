const { toInclude } = require('jest-extended');
expect.extend({ toInclude });
jest.mock('../src/models/Book');

const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../src/services/books');

const testBook = {
  title: 'Death Note',
  author: 'Ryuk',
  pages: 60,
  status: 'LENT',
};

describe('getBooks service test', () => {
  it('should return an array of books', () => {
    const books = getBooks();
    expect(Array.isArray(books)).toBe(true);
  });
});

describe('getBook service test', () => {
  it('should return a book', () => {
    const book = getBook(1);
    expect(book).toMatchObject(testBook);
  });
  it('should 404', () => {
    const book = getBook(2);
    expect(book).toBe('Not Found');
  });
});

describe('createBook service test', () => {
  it('should create a book', () => {
    const book = createBook(testBook);
    expect(book).toMatchObject(testBook);
  });
  it('should fail if parameters are missing', () => {
    const noTitle = createBook({
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    });
    const noAuthor = createBook({
      title: 'Death Note',
      pages: 60,
      status: 'LENT',
    });
    const noPages = createBook({
      title: 'Death Note',
      author: 'Ryuk',
      status: 'LENT',
    });
    const noStatus = createBook({
      title: 'Death Note',
      author: 'Ryuk',
      pages: 60,
    });
    const empty = createBook({});

    expect(noTitle.message).toMatch('is required');
    expect(noAuthor.message).toMatch('is required');
    expect(noPages.message).toMatch('is required');
    expect(noStatus.message).toMatch('is required');
    expect(empty.message).toMatch('is required');
  });
  it('should fail if pages parameter is less than one', () => {
    const book = createBook({
      title: 'Death Note',
      author: 'Ryuk',
      pages: 0,
      status: 'LENT',
    });
    expect(book.message).toMatch('must be greater than or equal to 1');
  });
  it('should fail if title exists', () => {
    const baseBook = {
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    };

    const lowercase = createBook({
      title: 'title test',
      ...baseBook,
    });
    const uppercase = createBook({
      title: 'TITLE TEST',
      ...baseBook,
    });
    const capitalize = createBook({
      title: 'Title Test',
      ...baseBook,
    });
    const randomcase = createBook({
      title: 'TiTlE TeSt',
      ...baseBook,
    });
    expect(lowercase).toBe('Error');
    expect(uppercase).toBe('Error');
    expect(capitalize).toBe('Error');
    expect(randomcase).toBe('Error');
  });
});

describe('updateBook service test', () => {
  it('should update a book', () => {
    const book = updateBook(1, {
      title: 'Updated',
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    });
    expect(book.title).toEqual('Updated');
  });
  it('should fail if pages parameter is less than one', () => {
    const book = updateBook(1, {
      title: 'Updated',
      author: 'Ryuk',
      pages: 0,
      status: 'LENT',
    });
    expect(book.message).toMatch('must be greater than or equal to 1');
  });
  it('should fail if title changed and already exists', () => {
    const baseBook = {
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    };

    const lowercase = updateBook(1, {
      title: 'title test',
      ...baseBook,
    });
    const uppercase = updateBook(1, {
      title: 'TITLE TEST',
      ...baseBook,
    });
    const capitalize = updateBook(1, {
      title: 'Title Test',
      ...baseBook,
    });
    const randomcase = updateBook(1, {
      title: 'TiTlE TeSt',
      ...baseBook,
    });
    expect(lowercase).toBe('Error');
    expect(uppercase).toBe('Error');
    expect(capitalize).toBe('Error');
    expect(randomcase).toBe('Error');
  });
});

describe('deleteBook service test', () => {
  it('should delete a book', () => {
    const book = deleteBook(1, testBook);
    expect(book).toMatchObject(testBook);
  });
  it('should 404', () => {
    const book = deleteBook(2, testBook);
    expect(book).toBe('Not Found');
  });
});
