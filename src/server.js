import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB';
import { logger } from './middleware/logger';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import notesRoutes from './routes/notesRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(pino());

app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Server Error',
    error: err.message,
  });
});

app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
