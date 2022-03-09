const express = require('express');
const router = express.Router();
const {
  getBooksApi,
  getBookApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
  partialUpdateBookApi,
} = require('../controllers/books');

router.route('/').get(getBooksApi).post(createBookApi);
router.route('/:id').get(getBookApi).put(updateBookApi).patch(partialUpdateBookApi).delete(deleteBookApi);

module.exports = router;
