import express from 'express';
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  searchByQuery,
  updateBookById,
} from '../Controller/books.js';
import { validateBook } from '../Middlewares/validation.js';

const router = express.Router();

//books - GET
router.route('/books').get(getAllBooks);

//book/new - POST
router.route('/book/new').post(validateBook, createNewBook);

//book/id - GET, PATCH, DELETE
router.route('/book/:id').get(getBookById).patch(validateBook, updateBookById).delete(deleteBookById);

//search using query - GET
router.route('/search').get(searchByQuery);

export { router };
