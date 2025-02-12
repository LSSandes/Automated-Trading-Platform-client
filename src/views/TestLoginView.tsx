import { useState } from 'react';
import { useCreateMetaAccount } from '../hooks/useMetaAccount';
import { Loader, CheckCircle2, AlertTriangle, RefreshCw, HelpCircle } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function TestLoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const createAccount = useCreateMetaAccount();

  // Form state
  const [platform, setPlatform] = useState<'mt4' | 'mt5'>('mt5');
  const [login, setLogin] = useState('313902');
  const [password, setPassword] = useState('dKbqXqU835Sz5Zb');
  const [server, setServer] = useState('Fyntura-Demo');
  const [broker, setBroker] = useState('Fyntura');

  const handleTest = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate required fields
      if (!login || !password || !server || !broker) {
        throw new Error('All fields are required');
      }

      const result = await createAccount.mutateAsync({
        name: `${broker} ${platform.toUpperCase()}`,
        login,
        password,
        server,
        platform,
        broker
      });

      setAccountData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to broker');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-white tracking-tight">MetaTrader Connection Test</h2>
          <p className="text-gray-400 mt-1">Verify your MetaTrader account connection</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="glass-panel rounded-xl p-6">
        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Platform</label>
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setPlatform('mt4')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                platform === 'mt4' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              MetaTrader 4
            </button>
            <button
              onClick={() => setPlatform('mt5')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                platform === 'mt5' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              MetaTrader 5
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Broker Name</span>
              <Tooltip content="Enter your broker's name (e.g., Fyntura, IC Markets)">
                <HelpCircle className="h-4 w-4" />
              </Tooltip>
            </label>
            <input
              type="text"
              value={broker}
              onChange={(e) => setBroker(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
              placeholder="e.g., Fyntura"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Server</span>
              <Tooltip content="Enter your broker's server address (found in MT4/MT5 login window)">
                <HelpCircle className="h-4 w-4" />
              </Tooltip>
            </label>
            <input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
              placeholder="e.g., Fyntura-Demo"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Login</span>
              <Tooltip content="Your MT4/MT5 account login number">
                <HelpCircle className="h-4 w-4" />
              </Tooltip>
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
              placeholder="e.g., 313902"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Password</span>
              <Tooltip content="Your MT4/MT5 account password">
                <HelpCircle className="h-4 w-4" />
              </Tooltip>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Test Button */}
        <button
          onClick={handleTest}
          disabled={isLoading || !login || !password || !server || !broker}
          className="w-full premium-button py-3 flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            'Test Connection'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-start space-x-3 text-red-400 bg-red-500/10 rounded-lg p-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Connection Failed</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message & Account Details */}
        {accountData && (
          <div className="mt-6 space-y-6">
            <div className="flex items-start space-x-3 text-emerald-400">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Successfully Connected!</p>
                <p className="text-sm text-gray-400 mt-1">Account details retrieved successfully</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Account Name</div>
                <div className="text-lg font-medium text-white">{accountData.name}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Login</div>
                <div className="text-lg font-medium text-white">{accountData.login}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Server</div>
                <div className="text-lg font-medium text-white">{accountData.server}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Platform</div>
                <div className="text-lg font-medium text-white">{accountData.platform.toUpperCase()}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Balance</div>
                <div className="text-lg font-medium text-emerald-400">
                  ${accountData.balance.toLocaleString()}
                </div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <div className="text-lg font-medium text-emerald-400">
                  {accountData.connectionStatus}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 p-4 bg-dark-200/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-gray-400">
              <p>To find your server details:</p>
              <ol className="list-decimal ml-4 space-y-1">
                <li>Open your MetaTrader platform</li>
                <li>Go to File → Open an Account (or Login to Trade Account)</li>
                <li>The server name will be shown in the login window</li>
                <li>For investor access, create an Investor Password in Account Settings</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}