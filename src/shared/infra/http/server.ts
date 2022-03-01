/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(
  '/service-icons',
  express.static(
    path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'serviceicons'),
  ),
);
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    console.log(err.message);

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on ${process.env.APP_API_URL}`);
  console.log(`⚙ Environment: ${process.env.NODE_ENV}`);
  app.use(express.json());
});
