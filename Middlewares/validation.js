import { body, validationResult } from 'express-validator';

import CustomError from '../Utils/customError.js';

export const validateBook = [
  body('title')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('The TITLE field is required to have a minimum length of 5 characters.'),
  body('author')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('The AUTHOR field is required to have a minimum length of 5 characters.'),
  body('publicationYear').exists().notEmpty().isInt().withMessage('Enter a valid Publication YEAR'),
  body('isbn')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('The ISBN field is required to have a minimum length of 13 characters.'),
  body('description')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('The DESCRIPTION field is required to have a minimum length of 5 characters.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new CustomError('Provide Proper Input', 422, errors.array()));
    next();
  },
];
