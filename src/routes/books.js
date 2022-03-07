const express = require("express");
const router = express.Router();
const {
  getBooksApi,
  getBookApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
} = require("../controllers/books");

router.route("/").get(getBooksApi).post(createBookApi);
router.route("/:id").get(getBookApi).put(updateBookApi).delete(deleteBookApi);

module.exports = router;
