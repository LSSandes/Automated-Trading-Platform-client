import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new AppError(
      'Validation error',
      'VALIDATION_ERROR',
      400
    );
  }

  if (error instanceof AxiosError) {
    return new AppError(
      error.response?.data?.message || 'Network error',
      'API_ERROR',
      error.response?.status || 500
    );
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      'UNKNOWN_ERROR',
      500
    );
  }

  return new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    500
  );
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}