export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-dark-200/50 rounded-lg"></div>
          <div className="h-4 w-64 bg-dark-200/50 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-dark-200/50 rounded-lg"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-panel rounded-xl p-6 space-y-4">
            <div className="h-6 w-24 bg-dark-200/50 rounded-lg"></div>
            <div className="h-8 w-32 bg-dark-200/50 rounded-lg"></div>
            <div className="h-4 w-20 bg-dark-200/50 rounded-lg"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-xl p-6">
          <div className="h-[300px] bg-dark-200/50 rounded-lg"></div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="h-[300px] bg-dark-200/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}