import { X, Clock, Zap, Check, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface LimitedTimeOfferProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LimitedTimeOffer({ isVisible, onClose }: LimitedTimeOfferProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <div className="glass-panel rounded-xl p-6 border-2 border-red-500/30 shadow-xl">
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
            <h3 className="text-lg font-medium text-white">Last Chance Offer!</h3>
            <div className="flex items-center space-x-2 text-sm text-red-400">
              <Clock className="h-4 w-4" />
              <CountdownTimer duration={5} />
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-400 font-medium">Flash Sale</span>
            <span className="text-sm text-gray-400">Save 40%</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">$39</span>
            <span className="text-gray-400">/month</span>
            <span className="text-sm text-gray-500 line-through">$79</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">One-time offer</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">Never shown again</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-red-400" />
            <span className="text-gray-300">Lock in this rate forever</span>
          </div>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg
                         flex items-center justify-center transition-colors">
          Claim Offer Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}