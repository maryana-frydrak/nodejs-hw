import { HttpError } from 'http-errors';

/* eslint-disable no-unused-vars */
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message || err.name,
    });
    return;
  }

  res.status(500).json({
    message: err.message,
  });
};
