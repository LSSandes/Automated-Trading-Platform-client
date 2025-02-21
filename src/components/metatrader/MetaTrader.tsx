import { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountList from './AccountList';
import AddAccountModal from './AddAccountModal';

export default function MetaTrader() {
  const [showAddAccount, setShowAddAccount] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between lg:items-center items-start lg:flex-row flex-col gap-4">
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight">MetaTrader</h1>
          <p className="text-gray-400 mt-1">Manage your MT4/MT5 accounts and monitor performance</p>
        </div>
        <button 
          onClick={() => setShowAddAccount(true)}
          className="premium-button flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Account
        </button>
      </div>

      <AccountList />

      <AddAccountModal 
        isOpen={showAddAccount}
        onClose={() => setShowAddAccount(false)}
      />
    </div>
  );
}