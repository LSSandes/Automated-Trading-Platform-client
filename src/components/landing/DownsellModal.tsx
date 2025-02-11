import React from 'react';
import { X, Gift, Check, ArrowRight, Clock } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface DownsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDecline: () => void;
  selectedPlan: any;
}

export default function DownsellModal({ isOpen, onClose, onDecline, selectedPlan }: DownsellModalProps) {
  if (!isOpen || !selectedPlan) return null;

  const currentPlan = selectedPlan.name;
  const discountedPrice = selectedPlan.id === 'basic' ? 59 : 159;
  const originalPrice = selectedPlan.id === 'basic' ? 79 : 199;

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
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Gift className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Wait! Special Offer</h3>
              <p className="text-gray-400 mt-1">We'd still love to have you as a customer</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Special Offer */}
          <div className="flex items-center justify-between bg-emerald-500/10 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-emerald-400 font-medium">One-Time Discount</div>
                <div className="text-sm text-gray-400">Save 25% on {currentPlan}</div>
              </div>
            </div>
            <CountdownTimer duration={15} />
          </div>

          {/* Pricing */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-4xl font-bold text-white">${discountedPrice}</span>
              <span className="text-gray-400">/month</span>
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Lock in this special rate forever
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Everything in {currentPlan}, Including:</h4>
            <div className="space-y-3">
              {selectedPlan.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-1 bg-emerald-500/10 rounded-lg">
                    <Check className="h-4 w-4 text-emerald-400" />
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
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg
                       flex items-center justify-center transition-colors duration-300"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button
              onClick={onDecline}
              className="w-full px-4 py-3 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300"
            >
              No thanks, I'll pass
            </button>
          </div>

          <div className="text-center text-xs text-gray-500">
            * This is a one-time offer that will expire when you leave this page
          </div>
        </div>
      </div>
    </div>
  );
}