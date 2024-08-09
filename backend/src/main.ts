import 'dotenv/config';
import express from 'express';
import logger from './config/logger';
import httpStatus from 'http-status';
import apiRoutes from './routes/index';
import ApiError from './util/ApiError';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/v1', apiRoutes);
app.get('/healthcheck', async (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  logger.error('Request Not Found');
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

app.use((err, req, res, next) => {
  const { statusCode, message, data } = err;
  const response = {
    ...data,
    message,
    status: statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };
  res.status(statusCode).json(response);
});

const port = process.env.PORT ?? 3000;
const server = app.listen(port, () => {
  if (process.env.NODE_ENV === 'development')
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
