const testBook = {
  title: "Death Note",
  author: "Ryuk",
  pages: 60,
  status: "LENT",
};

class Book {
  find() {
    return [];
  }

  findById(id) {
    if (id != 1) return "Not Found";
    return { id, ...testBook };
  }

  create({ title, author, pages, status }) {
    if (title == null || author == null || pages == null || status == null)
      return "Error";
    if (pages < 1) return "Error";
    if (title.toLowerCase() == "title test") return "Error";
    return { id: 1, title, author, pages, status };
  }

  findByIdAndUpdate(id, { title, author, pages, status }) {
    if (id != 1) return "Not Found";
    if (pages < 1) return "Error";
    if (title.toLowerCase() == "title test") return "Error";
    return { id, title, author, pages, status };
  }

  findByIdAndDelete(id) {
    if (id != 1) return "Not Found";
    return { id, ...testBook };
  }
}

module.exports = new Book();
