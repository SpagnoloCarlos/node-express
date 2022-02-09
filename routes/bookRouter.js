const express = require('express');
const booksController = require('../controllers/bookController');

const bookValidationSchema = require('../validationSchemas/bookValidationSchema');
const validator = require('express-joi-validation').createValidator();

const routes = (Book) => {
  const bookRouter = express.Router();

  const {getBooks, postBooks, getBookById, putBooks, deleteBookById} = booksController(Book);

  bookRouter.route('/books')
      .get(getBooks)
      .post(validator.body(bookValidationSchema), postBooks);

  bookRouter.route('/books/:bookId')
      .get(getBookById)
      .put(putBooks)
      .delete(deleteBookById);

  return bookRouter;
};

module.exports = routes;
