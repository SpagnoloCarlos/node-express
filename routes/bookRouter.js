const express = require('express');
const booksController = require('../controllers/bookController');

const bookValidationSchema = require('../validationSchemas/bookValidationSchema');
const validator = require('express-joi-validation').createValidator();

const routes = (Book) => {
  const bookRouter = express.Router();

  const {getAllBooks, postBooks, getBooksById, putBooks, deleteBooksById, getSearchBooks} = booksController(Book);

  bookRouter.route('/books')
      .get(getAllBooks)
      .post(validator.body(bookValidationSchema.bookSchema), postBooks);

  bookRouter.route('/books/:bookId')
      .get(getBooksById)
      .put(validator.body(bookValidationSchema.bookSchema), putBooks)
      .delete(deleteBooksById);

  bookRouter.route('/searchBooks')
      .get(validator.query(bookValidationSchema.queryBookSchema), getSearchBooks);

  return bookRouter;
};

module.exports = routes;
