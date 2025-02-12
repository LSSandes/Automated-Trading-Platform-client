import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="glass-panel rounded-xl p-6 text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Something went wrong</h3>
        <p className="text-gray-400 text-sm mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="premium-button px-4 py-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}