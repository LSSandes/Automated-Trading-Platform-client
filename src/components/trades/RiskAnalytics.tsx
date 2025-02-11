import React from 'react';
import { Shield, AlertTriangle, Target, TrendingUp } from 'lucide-react';

export default function RiskAnalytics() {
  return (
    <div className="glass-panel rounded-xl p-6 mt-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Shield className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-white">Risk Analytics</h2>
          <p className="text-gray-400 mt-1">Advanced risk management metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Metrics */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <h3 className="text-white font-medium">Risk Metrics</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Max Drawdown</span>
              <span className="text-red-400">8.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg Risk/Trade</span>
              <span className="text-white">1.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Risk/Reward</span>
              <span className="text-white">1:2.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Sharpe Ratio</span>
              <span className="text-emerald-400">2.1</span>
            </div>
          </div>
        </div>

        {/* Position Sizing */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-accent" />
            <h3 className="text-white font-medium">Position Sizing</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg Position Size</span>
              <span className="text-white">2.5 lots</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Max Position</span>
              <span className="text-white">5.0 lots</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Margin Usage</span>
              <span className="text-white">28.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Free Margin</span>
              <span className="text-emerald-400">$25,450</span>
            </div>
          </div>
        </div>

        {/* Performance Stability */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="text-white font-medium">Performance Stability</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Consistency Score</span>
              <span className="text-emerald-400">92.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Volatility</span>
              <span className="text-white">Low</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Recovery Factor</span>
              <span className="text-white">3.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Profit Stability</span>
              <span className="text-emerald-400">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}