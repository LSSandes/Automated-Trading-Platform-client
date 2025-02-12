export default function LoadingFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
    </div>
  );
}