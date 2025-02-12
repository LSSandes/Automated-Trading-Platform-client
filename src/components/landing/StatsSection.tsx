import FloatingStats from './FloatingStats';

export default function StatsSection() {
  return (
    <div className="py-20 bg-dark-100/30 border-y border-dark-300/30">
      <div className="max-w-7xl mx-auto px-4">
        <FloatingStats />
      </div>
    </div>
  );
}