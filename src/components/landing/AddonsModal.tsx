import { useState } from 'react';
import { X, Plus, Check, ArrowRight, Users, Bot, Shield } from 'lucide-react';

interface AddonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddon: (addonId: string) => void;
}

export default function AddonsModal({ isOpen, onClose, onAddAddon }: AddonsModalProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addons = [
    {
      id: 'extra-accounts',
      name: 'Additional Trading Accounts',
      description: 'Connect more trading accounts to your subscription',
      price: 29,
      icon: <Users className="h-5 w-5" />,
      features: [
        '5 additional trading accounts',
        'Separate risk management per account',
        'Individual performance tracking',
        'Cross-account analytics'
      ]
    },
    {
      id: 'ai-signals',
      name: 'AI Trading Signals',
      description: 'Get AI-powered trading signals and market analysis',
      price: 49,
      icon: <Bot className="h-5 w-5" />,
      features: [
        'Real-time trading signals',
        'Market sentiment analysis',
        'Pattern recognition',
        'Risk/reward optimization'
      ]
    },
    {
      id: 'advanced-security',
      name: 'Advanced Security Suite',
      description: 'Enhanced security features for your trading accounts',
      price: 39,
      icon: <Shield className="h-5 w-5" />,
      features: [
        'Two-factor authentication',
        'IP whitelisting',
        'Advanced encryption',
        'Security alerts'
      ]
    }
  ];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSave = () => {
    selectedAddons.forEach(addonId => onAddAddon(addonId));
    onClose();
  };

  if (!isOpen) return null;

  const totalPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-3xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Plus className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Enhance Your Trading</h3>
              <p className="text-gray-400 mt-1">Add powerful features to your subscription</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Addons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div 
                key={addon.id}
                className={`glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300
                           border-2 ${
                  selectedAddons.includes(addon.id)
                    ? 'border-accent shadow-accent/20'
                    : 'border-dark-300/30 hover:border-accent/30'
                }`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    {addon.icon}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAddons.includes(addon.id)
                      ? 'border-accent bg-accent'
                      : 'border-dark-300'
                  }`}>
                    {selectedAddons.includes(addon.id) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>

                <h4 className="text-lg font-medium text-white mb-2">{addon.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{addon.description}</p>

                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-white">${addon.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>

                <div className="space-y-2">
                  {addon.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="h-4 w-4 text-accent" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Total and Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-dark-300/30">
            <div>
              <div className="text-gray-400">Total Added</div>
              <div className="text-2xl font-bold text-white">
                ${totalPrice}<span className="text-gray-400 text-sm">/month</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-400 hover:text-gray-300 
                         transition-colors duration-300"
              >
                Skip
              </button>
              
              <button
                onClick={handleSave}
                disabled={selectedAddons.length === 0}
                className="premium-button px-6 py-3 flex items-center disabled:opacity-50
                         disabled:cursor-not-allowed"
              >
                Add Selected
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}