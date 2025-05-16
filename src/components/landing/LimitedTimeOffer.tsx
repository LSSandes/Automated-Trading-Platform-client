import { X, Clock, Zap, Check, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface LimitedTimeOfferProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LimitedTimeOffer({ isVisible, onClose }: LimitedTimeOfferProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 max-w-[90vw]">
      <div className="glass-panel rounded-xl p-4 md:p-6 border-2 border-red-500/30 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 text-gray-400 hover:text-white 
                   hover:bg-dark-200/50 rounded-lg transition-all duration-300"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Zap className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Lifetime Access Offer</h3>
            <div className="flex items-center space-x-2 text-sm text-red-400">
              <Clock className="h-4 w-4" />
              <CountdownTimer duration={30} />
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-400 font-medium">Limited Time</span>
            <span className="text-sm text-gray-400">Save 40%</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">$2,999</span>
            <span className="text-gray-400">/lifetime</span>
            <span className="text-sm text-gray-500 line-through">$4,999</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">Unlimited webhooks forever</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">Unlimited Hankox ActTrader Accounts</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">$4.99 per extra trading account</span>
          </div>
        </div>

        <a 
          href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 rounded-lg
                   flex items-center justify-center transition-colors"
        >
          Get Lifetime Access
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}