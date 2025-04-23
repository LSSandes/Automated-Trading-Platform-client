import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, ArrowRight, TrendingDown } from 'lucide-react';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface ChartData {
  profit: DataPoint[];
  trades: number;
  winRate: number;
  bestTrade: number;
  avgTrade: number;
}

export default function PerformanceChart() {
  const [timeframe, setTimeframe] = useState('1W');
  const [data, setData] = useState<ChartData>({
    profit: [],
    trades: 0,
    winRate: 0,
    bestTrade: 0,
    avgTrade: 0
  });

  // Generate realistic trading data
  useEffect(() => {
    const generateData = () => {
      const points: DataPoint[] = [];
      let currentValue = 10000; // Starting balance
      
      // Define periods and intervals based on timeframe
      const periodConfig = {
        '1D': { 
          periods: 12, // Changed to 12 periods for AM/PM format
          interval: 2 * 60 * 60 * 1000, // 2 hours
          tradesPerPeriod: { min: 0, max: 2 },
          resultRange: { min: -0.3, max: 0.5 },
          multiplier: 50
        },
        '1W': { 
          periods: 7, 
          interval: 24 * 60 * 60 * 1000, // 1 day
          tradesPerPeriod: { min: 3, max: 8 },
          resultRange: { min: -0.5, max: 0.8 },
          multiplier: 100
        },
        '1M': { 
          periods: 30, 
          interval: 24 * 60 * 60 * 1000, // 1 day
          tradesPerPeriod: { min: 2, max: 6 },
          resultRange: { min: -0.6, max: 1.0 },
          multiplier: 150
        },
        '1Y': { 
          periods: 12, 
          interval: 30 * 24 * 60 * 60 * 1000, // ~1 month
          tradesPerPeriod: { min: 40, max: 60 },
          resultRange: { min: -0.8, max: 1.2 },
          multiplier: 200
        }
      };

      const config = periodConfig[timeframe as keyof typeof periodConfig];
      const now = new Date();
      // For 1D view, align the start time to the nearest even hour
      const startTime = timeframe === '1D' 
        ? new Date(now).setHours(now.getHours() - (now.getHours() % 2), 0, 0, 0) - (config.periods * config.interval)
        : now.getTime() - (config.periods * config.interval);

      let trades = 0;
      let wins = 0;
      let bestTrade = 0;
      let totalProfit = 0;

      // Add initial point
      points.push({
        timestamp: startTime,
        value: currentValue
      });

      for (let i = 1; i <= config.periods; i++) {
        // Simulate trading activity for the period
        const numTrades = Math.floor(
          Math.random() * (config.tradesPerPeriod.max - config.tradesPerPeriod.min + 1) + 
          config.tradesPerPeriod.min
        );
        let periodProfit = 0;

        for (let j = 0; j < numTrades; j++) {
          trades++;
          // Generate more realistic trade results
          const baseResult = Math.random() * 
            (config.resultRange.max - config.resultRange.min) + 
            config.resultRange.min;
          
          // Apply market conditions bias (65% positive bias)
          const marketBias = Math.random() < 0.65 ? 1 : -1;
          const tradeResult = baseResult * config.multiplier * marketBias;

          if (tradeResult > 0) wins++;
          periodProfit += tradeResult;
          bestTrade = Math.max(bestTrade, tradeResult);
          totalProfit += tradeResult;
        }

        // Apply some momentum to the price movement
        const momentum = periodProfit > 0 ? 1.1 : 0.9;
        currentValue += periodProfit * momentum;

        // Add some market volatility
        const volatility = Math.random() * 100 - 50;
        currentValue += volatility;

        // Ensure we don't go below a reasonable value
        currentValue = Math.max(currentValue, 1000);

        points.push({
          timestamp: startTime + (i * config.interval),
          value: currentValue
        });
      }

      setData({
        profit: points,
        trades,
        winRate: trades > 0 ? (wins / trades) * 100 : 0,
        bestTrade,
        avgTrade: trades > 0 ? totalProfit / trades : 0
      });
    };

    generateData();
  }, [timeframe]);

  // Chart dimensions
  const width = 800;
  const height = 300;
  const padding = 40;

  // Calculate scales
  const xScale = (width - padding * 2) / (data.profit.length - 1);
  const yMin = Math.min(...data.profit.map(d => d.value));
  const yMax = Math.max(...data.profit.map(d => d.value));
  const yScale = (height - padding * 2) / (yMax - yMin);

  // Generate SVG path
  const pathD = data.profit.map((point, i) => {
    const x = padding + i * xScale;
    const y = height - padding - (point.value - yMin) * yScale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate area fill path
  const areaD = `${pathD} L ${padding + (data.profit.length - 1) * xScale} ${height - padding} L ${padding} ${height - padding} Z`;

  const profitChange = data.profit.length > 1 
    ? ((data.profit[data.profit.length - 1].value - data.profit[0].value) / data.profit[0].value) * 100
    : 0;

  const formatTimeLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case '1D': {
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}${ampm}`;
      }
      case '1W':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
      case '1M':
        return date.getDate().toString();
      case '1Y':
        return date.toLocaleString('default', { month: 'short' });
      default:
        return '';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Performance Overview</h2>
          <div className="flex items-center space-x-2 mt-1">
            {profitChange >= 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={profitChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
              {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(2)}%
            </span>
            <span className="text-gray-400">vs last period</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            {['1D', '1W', '1M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  timeframe === period 
                    ? 'bg-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[400px] mb-8">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding + (i * (height - padding * 2) / 5);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#2A2A2E"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-xs fill-gray-400"
                >
                  {formatCurrency(yMax - (i * (yMax - yMin) / 5))}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path
            d={areaD}
            fill="url(#areaGradient)"
            className="opacity-20"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="drop-shadow-[0_0_4px_rgba(0,122,255,0.5)]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.profit.map((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.value - yMin) * yScale;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-accent"
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {formatTimeLabel(point.timestamp)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats Below Chart */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-dark-300/30">
        <div>
          <div className="text-gray-400 text-sm">Total Trades</div>
          <div className="text-xl font-semibold text-white mt-1">{data.trades}</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Win Rate</div>
          <div className="text-xl font-semibold text-emerald-400 mt-1">
            {data.winRate.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Best Trade</div>
          <div className="text-xl font-semibold text-white mt-1">
            {formatCurrency(data.bestTrade)}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Avg. Trade</div>
          <div className="text-xl font-semibold text-white mt-1">
            {formatCurrency(data.avgTrade)}
          </div>
        </div>
      </div>

      <button className="mt-6 text-accent hover:text-accent-dark transition-colors flex items-center">
        View Detailed Analytics
        <ArrowRight className="h-4 w-4 ml-2" />
      </button>
    </div>
  );
}