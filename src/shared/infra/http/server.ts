import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import ora from 'ora';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/storage';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import dataSource from '@shared/infra/typeorm/data-source'; // Importação ajustada
import '@shared/container';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

// Does not apply for /files route
app.use(rateLimiter);

app.use(routes);

// Celebrate errors
app.use(errors());

// Middleware de tratativa de erros
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // eslint-disable-next-line no-console
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

// Inicializar o Data Source e iniciar o servidor
dataSource.initialize()
  .then(() => {
    app.listen(3333, '0.0.0.0', () => {
      ora('Server Running').succeed();
    });
  })
  .catch((error) => {
    console.error('Erro durante a inicialização do Data Source:', error);
  });
