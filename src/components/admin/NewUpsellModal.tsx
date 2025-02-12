import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

interface NewUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewUpsellModal({ isOpen, onClose }: NewUpsellModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetPlan, setTargetPlan] = useState<'free' | 'pro'>('free');
  const [offerPrice, setOfferPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [triggerEvent, setTriggerEvent] = useState('manual');
  const [displayLocation, setDisplayLocation] = useState('modal');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Handle upsell creation
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white">New Upsell Campaign</h3>
          <p className="text-gray-400 mt-1">Create a targeted upgrade offer</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Campaign Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter campaign title"
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter campaign description"
              rows={4}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            />
          </div>

          {/* Target Plan */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Target Plan</label>
            <select
              value={targetPlan}
              onChange={(e) => setTargetPlan(e.target.value as 'free' | 'pro')}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            >
              <option value="free">Free Users</option>
              <option value="pro">Pro Users</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Original Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="49.99"
                  className="w-full bg-dark-200/50 text-white rounded-lg pl-10 pr-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Offer Price</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="39.99"
                  className="w-full bg-dark-200/50 text-white rounded-lg pl-10 pr-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>
            </div>
          </div>

          {/* Trigger Event */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Trigger Event</label>
            <select
              value={triggerEvent}
              onChange={(e) => setTriggerEvent(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            >
              <option value="manual">Manual Trigger</option>
              <option value="feature_usage">Feature Usage</option>
              <option value="session_duration">Session Duration</option>
              <option value="trade_volume">Trade Volume</option>
            </select>
          </div>

          {/* Display Location */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Location</label>
            <select
              value={displayLocation}
              onChange={(e) => setDisplayLocation(e.target.value)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            >
              <option value="modal">Modal Popup</option>
              <option value="banner">Banner</option>
              <option value="sidebar">Sidebar</option>
              <option value="tooltip">Feature Tooltip</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              className="premium-button flex-1 py-2.5"
            >
              Create Campaign
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