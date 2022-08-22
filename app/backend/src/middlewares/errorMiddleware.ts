import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'badRequestError':
      res.status(400).json({ message });
      break;
    case 'unauthorizedError':
      res.status(401).json({ message });
      break;
    case 'notFoundError':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error!' });
      break;
  }
};

export default errorMiddleware;
