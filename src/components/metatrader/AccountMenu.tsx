import { 
  Settings, RefreshCw, Terminal, 
  Trash2, Link2
} from 'lucide-react';

interface AccountMenuProps {
  accountId: string;
  onClose: () => void;
}

export default function AccountMenu(_: AccountMenuProps) {
  return (
    <div className="absolute right-2 top-2 bg-dark-200/95 rounded-lg border border-dark-300/50 
                    shadow-xl backdrop-blur-xl p-1 z-10">
      <button
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Terminal className="h-4 w-4" />
        <span>Open Terminal</span>
      </button>
      
      <button
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Sync Account</span>
      </button>
      
      <button
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </button>
      
      <button
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Link2 className="h-4 w-4" />
        <span>Copy API Keys</span>
      </button>
      
      <button
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-400
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        <span>Remove Account</span>
      </button>
    </div>
  );
}