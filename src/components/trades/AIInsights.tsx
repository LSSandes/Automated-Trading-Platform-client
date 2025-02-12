import { Brain, TrendingUp, AlertTriangle, Clock, BarChart2, Target, Zap } from 'lucide-react';

interface InsightCard {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  metric?: {
    label: string;
    value: string;
    change?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AIInsights() {
  const insights: InsightCard[] = [
    {
      type: 'success',
      title: 'Optimal Trading Hours',
      description: 'Your win rate is 23% higher during London session. Consider focusing your trades during these hours.',
      metric: {
        label: 'Win Rate',
        value: '92.3%',
        change: '+23%'
      },
      action: {
        label: 'View Time Analysis',
        onClick: () => console.log('View time analysis')
      }
    },
    {
      type: 'warning',
      title: 'Risk Level Increasing',
      description: 'Current open positions show higher correlation than usual. Consider reducing exposure.',
      metric: {
        label: 'Risk Score',
        value: '7.2',
        change: '+2.1'
      },
      action: {
        label: 'Review Positions',
        onClick: () => console.log('Review positions')
      }
    },
    {
      type: 'info',
      title: 'Pattern Detected',
      description: 'Your most profitable setup occurs on EURUSD during high volatility periods.',
      metric: {
        label: 'Avg. Profit',
        value: '$425.50',
        change: '+15%'
      },
      action: {
        label: 'View Pattern',
        onClick: () => console.log('View pattern')
      }
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="h-5 w-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'info':
        return <Zap className="h-5 w-5 text-accent" />;
      default:
        return null;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'warning':
        return 'text-amber-400 bg-amber-500/10';
      case 'info':
        return 'text-accent bg-accent/10';
      default:
        return '';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Brain className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">AI Insights</h2>
            <p className="text-gray-400 mt-1">Smart analysis of your trading patterns</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="glass-panel rounded-xl p-6 border border-dark-300/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <h3 className="text-white font-medium">{insight.title}</h3>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{insight.description}</p>

            {insight.metric && (
              <div className="flex items-center justify-between mb-4 p-3 bg-dark-200/30 rounded-lg">
                <span className="text-sm text-gray-400">{insight.metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{insight.metric.value}</span>
                  {insight.metric.change && (
                    <span className={insight.metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>
                      {insight.metric.change}
                    </span>
                  )}
                </div>
              </div>
            )}

            {insight.action && (
              <button 
                onClick={insight.action.onClick}
                className="w-full px-4 py-2 border border-accent/30 text-accent rounded-lg
                         hover:bg-accent/10 transition-all duration-300"
              >
                {insight.action.label}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-400 mb-1">
            <Target className="h-4 w-4" />
            <span className="text-sm">Accuracy</span>
          </div>
          <div className="text-lg font-medium text-white">92.5%</div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Avg Hold Time</span>
          </div>
          <div className="text-lg font-medium text-white">2h 15m</div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-400 mb-1">
            <BarChart2 className="h-4 w-4" />
            <span className="text-sm">Success Rate</span>
          </div>
          <div className="text-lg font-medium text-emerald-400">+15.2%</div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-400 mb-1">
            <Zap className="h-4 w-4" />
            <span className="text-sm">Predictions</span>
          </div>
          <div className="text-lg font-medium text-white">145/156</div>
        </div>
      </div>
    </div>
  );
}