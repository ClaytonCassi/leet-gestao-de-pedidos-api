// src/shared/infra/http/middlewares/ensureAuthentication.ts

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}

export default async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User not found.', 401);
    }

    request.user = {
      id: sub,
      name: user.name,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
