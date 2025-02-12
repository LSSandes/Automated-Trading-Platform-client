import { useState } from 'react';
import { X, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewAnnouncementModal({ isOpen, onClose }: NewAnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success'>('info');
  const [targetUsers, setTargetUsers] = useState<'all' | 'free' | 'pro' | 'enterprise'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Handle announcement creation
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
          
          <h3 className="text-xl font-medium text-white">New Announcement</h3>
          <p className="text-gray-400 mt-1">Create a new announcement for your users</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter announcement message"
              rows={4}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setType('info')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  type === 'info' 
                    ? 'bg-accent text-white' 
                    : 'bg-dark-200/50 text-gray-400'
                }`}
              >
                <Info className="h-4 w-4" />
                <span>Info</span>
              </button>
              <button
                onClick={() => setType('warning')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  type === 'warning' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-dark-200/50 text-gray-400'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Warning</span>
              </button>
              <button
                onClick={() => setType('success')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  type === 'success' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-dark-200/50 text-gray-400'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Success</span>
              </button>
            </div>
          </div>

          {/* Target Users */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Target Users</label>
            <select
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value as any)}
              className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                       border border-dark-300/50 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            >
              <option value="all">All Users</option>
              <option value="free">Free Users</option>
              <option value="pro">Pro Users</option>
              <option value="enterprise">Enterprise Users</option>
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
              Create Announcement
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