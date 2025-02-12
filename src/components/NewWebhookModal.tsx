import { useState } from 'react';
import { X, Copy, AlertTriangle, Check } from 'lucide-react';

interface NewWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (name: string) => void;
}

export default function NewWebhookModal({ isOpen, onClose, onCreateWebhook }: NewWebhookModalProps) {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const webhookUrl = 'https://api.automatedtrader.com/webhook/abc123';

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white tracking-tight">Create New Webhook</h3>
          <p className="text-gray-400 mt-1">Configure your webhook endpoint for automated trading</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Webhook Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., TradingView Strategy 1"
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Webhook URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={webhookUrl}
                  readOnly
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 pr-24"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                           px-3 py-1.5 bg-accent/10 text-accent rounded-lg
                           hover:bg-accent/20 transition-all duration-300
                           flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  Keep your webhook URL secret! Anyone with this URL can send trades to your account.
                </p>
                <p className="text-sm text-gray-400">
                  Use this URL in your TradingView alerts or other trading platforms to automatically execute trades.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                onCreateWebhook(name);
                onClose();
              }}
              disabled={!name.trim()}
              className="premium-button flex-1 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Webhook
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                       rounded-lg hover:bg-dark-200/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}