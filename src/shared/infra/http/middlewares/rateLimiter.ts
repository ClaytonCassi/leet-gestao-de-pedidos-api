import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import AppError from '../../../../shared/errors/AppError';

const limiter = new RateLimiterMemory({
  keyPrefix: 'rateLimit',
  points: 5, // Número de requisições permitidas
  duration: 1, // Por segundo por IP
});

export default async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
