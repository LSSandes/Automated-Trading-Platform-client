import React from 'react';
import { X, Zap, Check, ArrowRight, Clock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDecline: () => void;
  selectedPlan: any;
}

export default function UpsellModal({ isOpen, onClose, onDecline, selectedPlan }: UpsellModalProps) {
  if (!isOpen || !selectedPlan) return null;

  const upgradePlan = selectedPlan.id === 'basic' ? 'Pro' : 'Enterprise';
  const price = selectedPlan.id === 'basic' ? 79 : 199;
  const originalPrice = selectedPlan.id === 'basic' ? 99 : 249;

  const additionalFeatures = selectedPlan.id === 'basic' ? [
    "Advanced risk management",
    "Copy trading access",
    "Priority execution speed (5x faster)",
    "Real-time analytics dashboard",
    "Priority support",
    "15 additional webhooks"
  ] : [
    "Custom API integration",
    "White-label solutions",
    "Custom feature development",
    "SLA guarantees",
    "24/7 dedicated support",
    "Unlimited webhooks"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDecline} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onDecline}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Upgrade to {upgradePlan}</h3>
              <p className="text-gray-400 mt-1">Get more power and features</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Special Offer */}
          <div className="flex items-center justify-between bg-accent/10 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <div className="text-accent font-medium">Special Upgrade Offer</div>
                <div className="text-sm text-gray-400">Save 20% Today</div>
              </div>
            </div>
            <CountdownTimer duration={30} />
          </div>

          {/* Pricing */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-4xl font-bold text-white">${price}</span>
              <span className="text-gray-400">/month</span>
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Additional Features You'll Get</h4>
            <div className="space-y-3">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-1 bg-accent/10 rounded-lg">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full premium-button py-3 flex items-center justify-center"
            >
              Upgrade Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button
              onClick={onDecline}
              className="w-full px-4 py-3 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300"
            >
              No thanks, I'll keep {selectedPlan.name}
            </button>
          </div>

          <div className="text-center text-xs text-gray-500">
            * This special pricing will never be offered again once you leave this page
          </div>
        </div>
      </div>
    </div>
  );
}