const testBooks = [
  {
    title: 'death note',
    author: 'ryuk',
    pages: 60,
    status: 'LENT',
  },
  {
    title: 'book of eli',
    author: 'jesus',
    pages: 1200,
    status: 'UNAVAILABLE',
  },
];

class Book {
  find() {
    return testBooks;
  }

  findById(id) {
    if (id !== 1) {
      return 'Not Found';
    }
    return { id, ...testBooks[0] };
  }

  create({ title, author, pages, status }) {
    if (title.toLowerCase() === testBooks[0].title || title.toLowerCase() === testBooks[1].title) {
      return `Title ${title} already exists`;
    }
    return { id: 1, title, author, pages, status };
  }

  findByIdAndUpdate(id, { title, author, pages, status }) {
    if (id !== 1) {
      return 'Not Found';
    }
    if (pages < 1) {
      return 'Error';
    }
    if (title.toLowerCase() === 'title test') {
      return 'Error';
    }
    return { id, title, author, pages, status };
  }

  findByIdAndDelete(id) {
    if (id !== 1) {
      return 'Not Found';
    }
    return { id, ...testBooks[0] };
  }
}

module.exports = new Book();
