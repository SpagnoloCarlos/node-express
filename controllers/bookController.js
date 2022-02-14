const booksController = (Book) => {
  const getAllBooks = async (req, res) => {
    const {query} = req;
    const allBooks = await Book.find(query);

    res.json(allBooks);
  };

  const postBooks = async (req, res) => {
    const book = new Book(req.body);
    await book.save();

    res.json(book);
  };

  const getBooksById = async (req, res) => {
    try {
      const {params} = req;
      const bookDb = await Book.findById(params.bookId);

      res.json(bookDb);
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'Book not found',
      });
    }
  };

  const putBooks = async (req, res) => {
    try {
      const {body} = req;

      const bookUpdate = await Book.updateOne({
        _id: req.params.bookId,
      }, {
        $set: {
          title: body.title,
          author: body.author,
          genre: body.genre,
          read: body.read,
        },
      });

      res.json(bookUpdate);
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'Book not found',
      });
    }
  };

  const deleteBooksById = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      await Book.findByIdAndDelete(bookId);

      res.json('The book has been successfully deleted');
    } catch {
      res.json({
        'error': 'Invalid _id',
        'message': 'Book not found',
      });
    }
  };

  const getSearchBooks = async (req, res) => {
    const {query} = req;
    const key = Object.keys(query).join('');

    if (key === 'title') {
      const bookDb = await Book.findOne({'title': query.title});

      if (bookDb) {
        res.json(bookDb);
      } else {
        res.json({'message': 'Book not found'});
      }
    } else if (key === 'author') {
      const booksDb = await Book.find({'author': query.author});

      if (booksDb.length !== 0) {
        res.json(booksDb);
      } else {
        res.json({'message': 'Book not found'});
      }
    }
  };

  return {getAllBooks, postBooks, getBooksById, putBooks, deleteBooksById, getSearchBooks};
};

module.exports = booksController;
