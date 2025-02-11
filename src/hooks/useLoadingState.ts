import { useState, useCallback } from 'react';

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export function useLoadingState(): LoadingState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    setLoading: setIsLoading,
    setError,
    reset
  };
}