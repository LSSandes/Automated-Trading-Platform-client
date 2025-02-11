import { useCallback } from 'react';
import { handleError, AppError } from '@/utils/error-handler';

interface ErrorHandlerOptions {
  onError?: (error: AppError) => void;
  showNotification?: boolean;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const handleAppError = useCallback(
    async (error: unknown) => {
      const appError = handleError(error);

      if (options.showNotification) {
        // Show error notification
        console.error(appError.message);
      }

      if (options.onError) {
        options.onError(appError);
      }

      return appError;
    },
    [options]
  );

  return handleAppError;
}