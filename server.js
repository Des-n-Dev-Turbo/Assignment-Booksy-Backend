import { createServer } from 'http';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { router } from './Routes/books.js';
import connectDb from './Utils/db.js';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
  })
);
app.use(express.json());

app.use(router);

// Error Handling Middleware
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ message: error.message || 'Something went wrong in the backend!' });
});

const server = createServer(app);

const PORT = process.env.PORT || 8080;

server.listen({ port: PORT }, async () => {
  await connectDb();
  console.log(`Server has been fired at port: ${PORT} 🚀`);
});
