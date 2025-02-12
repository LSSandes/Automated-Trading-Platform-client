import { TrendingUp, Award, Zap } from 'lucide-react';

export default function TradingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div className="glass-panel rounded-xl p-6 border-t border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Volume</h3>
              <p className="text-2xl font-semibold text-white">$2.8B+</p>
            </div>
          </div>
          <div className="text-emerald-400 text-sm font-medium">+12.5%</div>
        </div>
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
        </div>
      </div>

      <div className="glass-panel rounded-xl p-6 border-t border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Award className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
              <p className="text-2xl font-semibold text-white">92.3%</p>
            </div>
          </div>
          <div className="text-emerald-400 text-sm font-medium">+5.2%</div>
        </div>
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full w-[92%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
        </div>
      </div>

      <div className="glass-panel rounded-xl p-6 border-t border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Zap className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Execution Speed</h3>
              <p className="text-2xl font-semibold text-white">0.04s</p>
            </div>
          </div>
          <div className="text-emerald-400 text-sm font-medium">-15ms</div>
        </div>
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full w-[95%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}