import { Search } from 'lucide-react';

interface MarketFiltersProps {
  activeTab: string;
  searchQuery: string;
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
}

export default function MarketFilters({
  activeTab,
  searchQuery,
  onTabChange,
  onSearchChange
}: MarketFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <div className="flex rounded-lg bg-dark-200/30 p-1">
          {['all', 'crypto', 'forex', 'indices'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                   border border-dark-300/30 focus:outline-none focus:ring-1 
                   focus:ring-accent/50 transition-all duration-300"
        />
      </div>
    </div>
  );
}