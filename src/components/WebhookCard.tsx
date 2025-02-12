import { Clock, Copy, MoreVertical } from 'lucide-react';
import AssetBadge from './AssetBadge';

interface WebhookCardProps {
  title: string;
  symbol: string;
  assets: string[];
  isActive: boolean;
  isPublic: boolean;
}

export default function WebhookCard({ title, assets, isActive, isPublic }: WebhookCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-indigo-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Clock className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Copy className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Active</span>
          <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${isActive ? 'bg-indigo-500' : 'bg-gray-700'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Public</span>
          <button className={`relative inline-flex h-6 w-11 items-center rounded-full ${isPublic ? 'bg-indigo-500' : 'bg-gray-700'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex flex-wrap gap-1">
            {assets.map((asset) => (
              <AssetBadge 
                key={asset}
                symbol={asset}
                type={
                  asset.includes('USD') ? 'forex' :
                  asset.includes('BTC') || asset.includes('ETH') ? 'crypto' :
                  'indices'
                }
              />
            ))}
          </div>
          <div className="flex items-center text-emerald-400 text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            connected
          </div>
        </div>
      </div>
    </div>
  );
}