import { AppError } from '@shared/errors/AppError';

describe('AppError', () => {
  it('should create an error with message and status code', () => {
    const error = new AppError('Test error', 400);
    
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error).toBeInstanceOf(Error);
  });

  it('should default to status code 400', () => {
    const error = new AppError('Client error');
    
    expect(error.message).toBe('Client error');
    expect(error.statusCode).toBe(400);
  });

  it('should work with different status codes', () => {
    const notFound = new AppError('Not found', 404);
    const unauthorized = new AppError('Unauthorized', 401);
    const badRequest = new AppError('Bad request', 400);
    
    expect(notFound.statusCode).toBe(404);
    expect(unauthorized.statusCode).toBe(401);
    expect(badRequest.statusCode).toBe(400);
  });
});
