import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

dotenv.config();

const app = express();

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

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
