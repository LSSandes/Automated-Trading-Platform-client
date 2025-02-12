import { useState } from 'react';
import { Lock, Plus, Bell, DollarSign } from 'lucide-react';
import NewAnnouncementModal from '../components/admin/NewAnnouncementModal';
import NewUpsellModal from '../components/admin/NewUpsellModal';

const AdminView = () => {
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showNewUpsell, setShowNewUpsell] = useState(false);
  // const [filterType, setFilterType] = useState('all');
  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Lock className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Admin Panel</h1>
            <p className="text-gray-400 mt-1">Manage announcements and special offers</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Active Users</div>
          <div className="text-2xl font-semibold text-white">15,234</div>
          <div className="text-emerald-400 text-sm">+12.5% vs last month</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Premium Users</div>
          <div className="text-2xl font-semibold text-white">8,567</div>
          <div className="text-emerald-400 text-sm">56% conversion rate</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Monthly Revenue</div>
          <div className="text-2xl font-semibold text-emerald-400">$256,789</div>
          <div className="text-emerald-400 text-sm">+8.3% vs last month</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Active Offers</div>
          <div className="text-2xl font-semibold text-white">12</div>
          <div className="text-emerald-400 text-sm">85% engagement rate</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setShowNewAnnouncement(true)}
          className="glass-panel glass-panel-hover rounded-xl p-6 text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Bell className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">New Announcement</h3>
              <p className="text-gray-400 mt-1">Create targeted announcements for users</p>
            </div>
            <Plus className="h-5 w-5 text-accent ml-auto" />
          </div>
        </button>

        <button 
          onClick={() => setShowNewUpsell(true)}
          className="glass-panel glass-panel-hover rounded-xl p-6 text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">New Special Offer</h3>
              <p className="text-gray-400 mt-1">Create upsell offers and promotions</p>
            </div>
            <Plus className="h-5 w-5 text-accent ml-auto" />
          </div>
        </button>
      </div>

      {/* Modals */}
      <NewAnnouncementModal
        isOpen={showNewAnnouncement}
        onClose={() => setShowNewAnnouncement(false)}
      />
      <NewUpsellModal
        isOpen={showNewUpsell}
        onClose={() => setShowNewUpsell(false)}
      />
    </div>
  );
};

export default AdminView;