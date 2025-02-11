import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SocialProof {
  tradingVolume: string;
  activeUsers: string;
  successRate: string;
  uptime: string;
}

interface FinalCTAProps {
  socialProof: SocialProof;
}

export default function FinalCTA({ socialProof }: FinalCTAProps) {
  return (
    <div className="py-20 relative overflow-hidden bg-gradient-to-b from-dark-100/30 to-dark">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Trading?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of traders already using AutomatedTrader to achieve consistent profits
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="premium-button px-8 py-4 text-lg flex items-center">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="px-8 py-4 text-lg border border-accent/30 text-accent rounded-lg
                         hover:bg-accent/10 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{socialProof.tradingVolume}</div>
            <div className="text-gray-400">Trading Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{socialProof.activeUsers}</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{socialProof.successRate}</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{socialProof.uptime}</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}