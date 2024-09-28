import { Request, Response, NextFunction } from 'express';
import AppError from '../../../../../shared/errors/AppError';

export default function ensureRole(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { role } = request.user;


    if (!role || !roles.includes(role)) {
      throw new AppError('User does not have permission to access this resource.', 403);
    }

    return next();
  };
}
