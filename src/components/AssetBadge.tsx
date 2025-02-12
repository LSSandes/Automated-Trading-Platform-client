import { DollarSign, TrendingUp, Currency } from 'lucide-react';

interface AssetBadgeProps {
  symbol: string;
  type: 'forex' | 'crypto' | 'indices' | 'commodities';
}

export default function AssetBadge({ symbol, type }: AssetBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case 'forex':
        return <Currency className="h-3 w-3" />;
      case 'crypto':
        return <DollarSign className="h-3 w-3" />;
      case 'indices':
        return <TrendingUp className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-700 text-gray-300 text-xs">
      {getIcon()}
      <span className="ml-1">{symbol}</span>
    </div>
  );
}