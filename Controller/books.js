import Book from '../Model/books.js';
import CustomError from '../Utils/customError.js';
import esClient from '../Utils/esClient.js';

//Create new Book Handler
const createNewBook = async (req, res, next) => {
  try {
    const newBookData = req.body;

    const newBook = new Book({ ...newBookData, publicationYear: +newBookData.publicationYear });

    await newBook.save();

    res.status(201).json({ success: true, book: newBook.toObject({ getters: true }) });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

//Get all the books handler
const getAllBooks = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const ITEMS_PER_PAGE = 6;

    const totalBooks = await Book.countDocuments();

    const books = await Book.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res
      .status(200)
      .json({ success: true, totalItems: totalBooks, books: books.map((book) => book.toObject({ getters: true })) });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

//Get a specific book by id handler
const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);

    if (!book) {
      return next(new CustomError(`Book with the Id - ${id} not found!`, 404));
    }

    res.status(200).json({ success: true, book: book.toObject({ getters: true }) });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

//Update a specific book by id handler
const updateBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);

    if (!book) {
      return next(new CustomError(`Book with the Id - ${id} not found!`, 404));
    }

    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...updatedData, publicationYear: +updatedData.publicationYear },
      { new: true }
    );
    res.status(202).json({ success: true, book: updatedBook.toObject({ getters: true }) });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

//Delete a specific book by id handler
const deleteBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);

    if (!book) {
      return next(new CustomError(`Book with the Id - ${id} not found!`, 404));
    }

    const deletedBook = await Book.findByIdAndDelete(id);
    await deletedBook.unIndex();

    res.status(202).json({ success: true, book: deletedBook.toObject({ getters: true }) });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

//Search for the Books matching the keyword, using ElasticSearch
const searchByQuery = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm;

    const fields = ['title', 'author', 'description'];

    const response = await esClient.search({
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: searchTerm,
                  fields,
                },
              },
              {
                fuzzy: {
                  title: {
                    value: searchTerm,
                  },
                },
              },
              {
                fuzzy: {
                  author: {
                    value: searchTerm,
                  },
                },
              },
              {
                fuzzy: {
                  description: {
                    value: searchTerm,
                  },
                },
              },
            ],
          },
        },
      },
    });

    if (!response.hits.hits.length) {
      return next(new CustomError(`There are no Books or Authors matching this Term - ${searchTerm}`), 404);
    }

    const transformedData = response.hits.hits.map((data) => ({
      id: data._id,
      ...data._source,
    }));

    res.status(200).json({ success: true, data: transformedData });
  } catch (error) {
    const err = new CustomError(error.message, 500);
    return next(err);
  }
};

export { createNewBook, getAllBooks, getBookById, updateBookById, deleteBookById, searchByQuery };
