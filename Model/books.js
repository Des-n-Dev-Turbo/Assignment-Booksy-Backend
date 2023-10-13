import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

import esClient from '../Utils/esClient.js';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, es_indexed: true },
  author: { type: String, required: true, es_indexed: true },
  publicationYear: { type: Number, required: true },
  isbn: { type: String, required: true },
  description: { type: String, required: true, es_indexed: true },
  imageUrl: String,
});

bookSchema.plugin(mongoosastic, {
  esClient: esClient,
});

const Book = mongoose.model('Book', bookSchema, 'search-books');

export default Book;
