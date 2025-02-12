import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';

export default function TradingChart() {
  return (
    <div className="relative mt-20 max-w-6xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-dark/0 to-dark z-20 pointer-events-none"></div>
      
      <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-dark-300/30
                    transform hover:scale-[1.02] transition-all duration-500">
        <img 
          src="https://images.unsplash.com/photo-1642790551116-18e150f248e5?auto=format&fit=crop&w=2000&q=80"
          alt="Trading Interface"
          className="w-full"
        />
        
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 glass-panel rounded-lg p-4 animate-float-slow">
          <div className="flex items-center space-x-3">
            <BarChart2 className="h-5 w-5 text-accent" />
            <div>
              <div className="text-sm text-gray-400">Total Profit</div>
              <div className="text-lg font-bold text-emerald-400">+$48,256.12</div>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8 glass-panel rounded-lg p-4 animate-float-medium">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <div>
              <div className="text-sm text-gray-400">Win Rate</div>
              <div className="text-lg font-bold text-white">89.5%</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 glass-panel rounded-lg p-4 animate-float-fast">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm text-gray-400">Active Traders</div>
              <div className="text-lg font-bold text-white">12,445</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}