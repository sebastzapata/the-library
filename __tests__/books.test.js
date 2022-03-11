const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../src/services/books');
jest.mock('../src/models/Book');
const mockModel = require('../src/models/Book');

jest.mock('util', () => ({
  promisify: jest.fn(),
}));
const util = require('util');

const redisMock = require('@condor-labs/redis');
jest.mock('@condor-labs/redis', () => () => ({
  getClient: () => ({
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  }),
}));
console.log(redisMock);

describe('getBooks service test', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return an array of books', async () => {
    const spy = jest.spyOn(mockModel, 'find');
    const books = await getBooks();
    expect(Array.isArray(books)).toBe(true);
    expect(books[0].title).toEqual('death note');
    expect(books[1].title).toEqual('book of eli');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('getBook service test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a book', async () => {
    const spy = jest.spyOn(mockModel, 'findById');
    util.promisify.mockReturnValue(() => null);
    const book = await getBook(1);
    expect(book.title).toEqual('death note');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
  it('should 404', async () => {
    const spy = jest.spyOn(mockModel, 'findById');
    const book = await getBook(2);
    expect(book).toBe('Not Found');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);
  });
});

describe('createBook service test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a book', async () => {
    const spy = jest.spyOn(mockModel, 'create');
    const newBook = {
      title: 'new book',
      author: 'new author',
      pages: 10,
      status: 'AVAILABLE',
    };
    const book = await createBook(newBook);
    expect(book).toMatchObject(newBook);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(newBook);
  });
  it('should fail if parameters are missing', async () => {
    const noTitle = await createBook({
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    });
    const noAuthor = await createBook({
      title: 'Death Note',
      pages: 60,
      status: 'LENT',
    });
    const noPages = await createBook({
      title: 'Death Note',
      author: 'Ryuk',
      status: 'LENT',
    });
    const noStatus = await createBook({
      title: 'Death Note',
      author: 'Ryuk',
      pages: 60,
    });
    const empty = await createBook({});

    expect(noTitle.message).toMatch('is required');
    expect(noAuthor.message).toMatch('is required');
    expect(noPages.message).toMatch('is required');
    expect(noStatus.message).toMatch('is required');
    expect(empty.message).toMatch('is required');
  });
  it('should fail if pages parameter is less than one', async () => {
    const book = await createBook({
      title: 'Death Note',
      author: 'Ryuk',
      pages: 0,
      status: 'LENT',
    });
    expect(book.message).toMatch('must be greater than or equal to 1');
  });
  it('should fail if title exists', async () => {
    const baseBook = {
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    };

    const lowercase = await createBook({
      title: 'death note',
      ...baseBook,
    });
    const uppercase = await createBook({
      title: 'DEATH NOTE',
      ...baseBook,
    });
    const capitalize = await createBook({
      title: 'Death Note',
      ...baseBook,
    });
    const randomcase = await createBook({
      title: 'dEaTh NoTe',
      ...baseBook,
    });
    expect(lowercase).toBe('Title death note already exists');
    expect(uppercase).toBe('Title DEATH NOTE already exists');
    expect(capitalize).toBe('Title Death Note already exists');
    expect(randomcase).toBe('Title dEaTh NoTe already exists');
  });

  it('should fail if status is wrong', async () => {
    const newBook = {
      title: 'new book',
      author: 'new author',
      pages: 10,
      status: 'WRONG',
    };
    const book = await createBook(newBook);
    expect(book.message).toMatch('must be one of [LENT, AVAILABLE, UNAVAILABLE]');
  });
});

describe('updateBook service test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a book', async () => {
    const spy = jest.spyOn(mockModel, 'findByIdAndUpdate');
    const updateOptions = { new: true, upsert: true, runValidators: true, overwrite: true };
    const updatedBook = {
      title: 'Updated',
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    };

    const book = await updateBook(1, updatedBook);
    expect(book.title).toEqual('Updated');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1, updatedBook, updateOptions);
  });
  it('should fail if pages parameter is less than one', async () => {
    const book = await updateBook(1, {
      title: 'Updated',
      author: 'Ryuk',
      pages: 0,
      status: 'LENT',
    });
    expect(book.message).toMatch('must be greater than or equal to 1');
  });
  it('should fail if title changed and already exists', async () => {
    const baseBook = {
      author: 'Ryuk',
      pages: 60,
      status: 'LENT',
    };

    const lowercase = await updateBook(1, {
      title: 'title test',
      ...baseBook,
    });
    const uppercase = await updateBook(1, {
      title: 'TITLE TEST',
      ...baseBook,
    });
    const capitalize = await updateBook(1, {
      title: 'Title Test',
      ...baseBook,
    });
    const randomcase = await updateBook(1, {
      title: 'TiTlE TeSt',
      ...baseBook,
    });
    expect(lowercase).toBe('Error');
    expect(uppercase).toBe('Error');
    expect(capitalize).toBe('Error');
    expect(randomcase).toBe('Error');
  });
  it('should fail if status is wrong', async () => {
    const updatedBook = {
      title: 'new book',
      author: 'new author',
      pages: 10,
      status: 'WRONG',
    };
    const book = await updateBook(1, updatedBook);
    expect(book.message).toMatch('must be one of [LENT, AVAILABLE, UNAVAILABLE]');
  });
});

describe('deleteBook service test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a book', async () => {
    const spy = jest.spyOn(mockModel, 'findByIdAndDelete');
    const deletedBook = {
      title: 'death note',
      author: 'ryuk',
      pages: 60,
      status: 'LENT',
    };
    const book = await deleteBook(1);
    expect(book).toMatchObject(deletedBook);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
  it('should 404', async () => {
    const spy = jest.spyOn(mockModel, 'findByIdAndDelete');
    const book = await deleteBook(2);
    expect(book).toBe('Not Found');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(2);
  });
});
