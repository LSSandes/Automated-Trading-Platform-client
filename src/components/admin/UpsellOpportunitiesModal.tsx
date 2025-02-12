import React, { useState } from 'react';
import { X, DollarSign,BarChart2, Clock, Users, Zap, Gift, Target, ArrowRight, Percent, Shield } from 'lucide-react';

interface UpsellOpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UpsellTemplate {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'trial' | 'bundle' | 'feature';
  icon: React.ReactNode;
}

export default function UpsellOpportunitiesModal({ isOpen, onClose }: UpsellOpportunitiesModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: UpsellTemplate[] = [
    {
      id: 'limited-time',
      title: 'Limited Time Discount',
      description: 'Offer a time-sensitive discount to create urgency',
      type: 'discount',
      icon: <Clock className="h-5 w-5 text-accent" />
    },
    {
      id: 'feature-unlock',
      title: 'Feature Preview',
      description: 'Give users temporary access to premium features',
      type: 'trial',
      icon: <Zap className="h-5 w-5 text-purple-400" />
    },
    {
      id: 'bundle-deal',
      title: 'Bundle Package',
      description: 'Combine multiple features at a discounted price',
      type: 'bundle',
      icon: <Gift className="h-5 w-5 text-emerald-400" />
    },
    {
      id: 'usage-based',
      title: 'Usage Milestone',
      description: 'Trigger offers when users reach certain usage levels',
      type: 'feature',
      icon: <Target className="h-5 w-5 text-yellow-400" />
    }
  ];

  const features = [
    {
      title: "Advanced Risk Management",
      description: "AI-powered stop loss and take profit optimization",
      price: 29.99,
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: "Copy Trading Pro",
      description: "Follow unlimited traders with priority execution",
      price: 39.99,
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Market Analytics",
      description: "Real-time market analysis and predictions",
      price: 49.99,
      icon: <BarChart2 className="h-5 w-5" />
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-4xl z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white">Upsell Opportunities</h3>
          <p className="text-gray-400 mt-1">Create targeted upgrade incentives for your users</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Users className="h-4 w-4" />
                <span>Free Users</span>
              </div>
              <div className="text-2xl font-semibold text-white">15,234</div>
              <div className="text-sm text-emerald-400 mt-1">+12.5% conversion potential</div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <DollarSign className="h-4 w-4" />
                <span>Avg. Upgrade Value</span>
              </div>
              <div className="text-2xl font-semibold text-white">$89.99</div>
              <div className="text-sm text-emerald-400 mt-1">+5.2% vs last month</div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Percent className="h-4 w-4" />
                <span>Conversion Rate</span>
              </div>
              <div className="text-2xl font-semibold text-white">8.5%</div>
              <div className="text-sm text-emerald-400 mt-1">+2.1% vs benchmark</div>
            </div>
            
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Gift className="h-4 w-4" />
                <span>Active Offers</span>
              </div>
              <div className="text-2xl font-semibold text-white">12</div>
              <div className="text-sm text-emerald-400 mt-1">85% engagement rate</div>
            </div>
          </div>

          {/* Upsell Templates */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Quick Templates</h4>
              <div className="space-y-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full glass-panel rounded-xl p-4 text-left transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-2 border-accent' 
                        : 'hover:bg-dark-200/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        {template.icon}
                      </div>
                      <div>
                        <h5 className="text-white font-medium">{template.title}</h5>
                        <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent ml-auto" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Feature Highlights</h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="glass-panel rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white font-medium">{feature.title}</h5>
                        <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-accent font-medium">${feature.price}</div>
                        <button className="text-sm text-accent hover:text-accent-dark mt-1">
                          Create Offer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Targeting Options */}
          <div className="glass-panel rounded-xl p-6">
            <h4 className="text-lg font-medium text-white mb-4">Smart Targeting</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">User Segment</label>
                <select className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50">
                  <option>Free Users</option>
                  <option>Trial Users</option>
                  <option>Basic Plan</option>
                  <option>Inactive Users</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Trigger Event</label>
                <select className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50">
                  <option>Feature Usage</option>
                  <option>Session Duration</option>
                  <option>Trade Volume</option>
                  <option>Manual Trigger</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Display Location</label>
                <select className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50">
                  <option>Modal Popup</option>
                  <option>Banner</option>
                  <option>Sidebar</option>
                  <option>Feature Tooltip</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-300/30">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300"
            >
              Cancel
            </button>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-accent hover:text-accent-dark transition-colors">
                Save as Draft
              </button>
              <button className="premium-button px-4 py-2">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}