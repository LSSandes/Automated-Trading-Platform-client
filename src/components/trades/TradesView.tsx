import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function TradesView() {
  const [selectedWebhook, setSelectedWebhook] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-white tracking-tight">Trades</h2>
        <button className="premium-button">
          Open Trade
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select 
            value={selectedWebhook}
            onChange={(e) => setSelectedWebhook(e.target.value)}
            className="bg-dark-200/30 text-gray-300 pl-4 pr-8 py-2 rounded-lg 
                     border border-dark-300/30 appearance-none cursor-pointer
                     focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option>All</option>
            <option>Webhook 1</option>
            <option>Webhook 2</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="relative">
          <select 
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-dark-200/30 text-gray-300 pl-4 pr-8 py-2 rounded-lg 
                     border border-dark-300/30 appearance-none cursor-pointer
                     focus:outline-none focus:ring-1 focus:ring-accent/50"
          >
            <option>All</option>
            <option>Account 1</option>
            <option>Account 2</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <TradeStats /> */}

      {/* Calendar */}
      {/* <TradesCalendar /> */}

      {/* Trades Table */}
      {/* <TradesTable /> */}
    </div>
  );
}