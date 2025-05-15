import { X, TrendingUp, BarChart2, 
          Activity } from 'lucide-react';
import { WebhookStatsModalProps } from '@/types/webhook';
export default function WebhookStatsModal({ isOpen, onClose, webhook }: WebhookStatsModalProps) {
  if (!isOpen) return null;

  const weeklyActivity = [
    { day: 'Sun', total: 5, long: 3, short: 2 },
    { day: 'Mon', total: 7, long: 4, short: 3 },
    { day: 'Tue', total: 6, long: 4, short: 2 },
    { day: 'Wed', total: 8, long: 5, short: 3 },
    { day: 'Thu', total: 7, long: 4, short: 3 },
    { day: 'Fri', total: 6, long: 4, short: 2 },
    { day: 'Sat', total: 4, long: 3, short: 1 }
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-4xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Activity className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">{webhook.webhookName}</h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-accent">advanced</span>
                <span className="text-sm text-emerald-400">• connected</span>
                <span className="text-sm text-gray-400">Last trigger: 5 minutes ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Total Trades</div>
              <div className="text-2xl font-semibold text-white">145</div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Profits</div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold text-emerald-400">$2,891</span>
                <div className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                  +12.5%
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Best Trade</div>
              <div className="text-2xl font-semibold text-emerald-400">$780.30</div>
              <div className="w-full h-1 bg-dark-200 rounded-full mt-2">
                <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Worst Trade</div>
              <div className="text-2xl font-semibold text-red-400">-$120.50</div>
              <div className="w-full h-1 bg-dark-200 rounded-full mt-2">
                <div className="h-full w-1/4 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Total Lots</div>
              <div className="text-2xl font-semibold text-white">14.52</div>
            </div>

            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Best Streak</div>
              <div className="text-2xl font-semibold text-emerald-400">8</div>
              <div className="w-full h-1 bg-dark-200 rounded-full mt-2">
                <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Win Trades</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">112</span>
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-emerald-400">
                    78%
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4">
              <div className="text-gray-400 text-sm mb-2">Loss Trades</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">33</span>
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-2 border-red-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400">
                    22%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Activity & Win Rate */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-medium text-white">Trading Activity</h3>
                </div>
                <div className="text-sm text-emerald-400">Wednesday is a hot day</div>
              </div>

              <div className="h-48 flex items-end space-x-4">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex-1">
                    <div className="relative h-full flex flex-col justify-end space-y-1">
                      <div 
                        className="w-full bg-gray-700 rounded-sm"
                        style={{ height: `${(day.total / 8) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-emerald-500/50 rounded-sm"
                        style={{ height: `${(day.long / 8) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-red-500/50 rounded-sm"
                        style={{ height: `${(day.short / 8) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-xs text-gray-400">{day.day}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Total trades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500/50 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Long trades</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500/50 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Short trades</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-medium text-white">Win Rate</h3>
                </div>
                <div className="text-sm text-emerald-400">+12.5% vs last week</div>
              </div>

              <div className="h-48 relative">
                {/* This would be replaced with a proper chart library */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-accent/20"></div>
                <div className="absolute left-0 top-0 h-full w-px bg-accent/20"></div>
              </div>

              <div className="flex justify-between mt-4 text-xs text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}