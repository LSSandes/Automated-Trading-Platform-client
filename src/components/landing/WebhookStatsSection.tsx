import LivePerformanceChart from '../charts/LivePerformanceChart';

export default function WebhookStatsSection() {
  return (
    <div className="py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Real-Time Performance Tracking
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Monitor your trading performance with advanced analytics and real-time statistics
          </p>
        </div>

        <LivePerformanceChart />
      </div>
    </div>
  );
}