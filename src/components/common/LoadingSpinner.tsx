export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-10 h-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
    </div>
  );
}