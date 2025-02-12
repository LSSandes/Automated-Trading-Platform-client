import React, { useState } from 'react';
import { Shield, Bot, Zap, Users, Star, Clock, ArrowRight, DollarSign, Plus } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  included?: boolean;
}

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['basic']);
  const [accounts, setAccounts] = useState(1);

  const features: Feature[] = [
    {
      id: 'basic',
      name: 'Basic Features',
      description: 'Essential trading automation tools',
      price: 29,
      icon: <Bot className="h-5 w-5" />,
      included: true
    },
    {
      id: 'advanced',
      name: 'Advanced Trading',
      description: 'Professional trading features and analytics',
      price: 49,
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'copy',
      name: 'Copy Trading',
      description: 'Copy top-performing traders automatically',
      price: 79,
      icon: <Users className="h-5 w-5" />
    }
  ];

  const calculateTotalPrice = () => {
    const basePrice = features
      .filter(f => selectedFeatures.includes(f.id))
      .reduce((sum, f) => sum + f.price, 0);
    
    const extraAccountsPrice = (accounts - 1) * 19;
    const monthlyTotal = basePrice + extraAccountsPrice;
    
    return billingCycle === 'monthly' 
      ? monthlyTotal 
      : Math.floor(monthlyTotal * 10); // 20% yearly discount
  };

  const toggleFeature = (featureId: string) => {
    if (featureId === 'basic') return; // Can't disable basic features
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <div className="py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30" id="pricing">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-8
                        border border-accent/20 backdrop-blur-sm">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Build Your Perfect Plan</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Customize Your Trading Edge
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the features you need and scale as you grow
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center space-x-4 bg-dark-200/30 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-8 border-2 border-accent/20">
          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-white">
                ${calculateTotalPrice()}
              </span>
              <span className="text-xl text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <p className="text-gray-400 mt-2">
              {billingCycle === 'yearly' && 'Save 20% with annual billing'}
            </p>
          </div>

          {/* Features Selection */}
          <div className="space-y-4 mb-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`glass-panel rounded-xl p-4 transition-all ${
                  selectedFeatures.includes(feature.id) 
                    ? 'border-2 border-accent' 
                    : 'border border-dark-300/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      selectedFeatures.includes(feature.id) 
                        ? 'bg-accent/10' 
                        : 'bg-dark-200/50'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{feature.name}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-white font-medium">
                        +${feature.price}/mo
                      </div>
                    </div>
                    {!feature.included && (
                      <button
                        onClick={() => toggleFeature(feature.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          selectedFeatures.includes(feature.id) ? 'bg-accent' : 'bg-dark-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          selectedFeatures.includes(feature.id) ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Account Management */}
          <div className="glass-panel rounded-xl p-4 mb-8 border border-accent/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-medium">Trading Accounts</div>
                <div className="text-sm text-gray-400">
                  ${19}/month per extra account
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setAccounts(prev => Math.max(1, prev - 1))}
                  className="p-1 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded"
                  disabled={accounts === 1}
                >
                  -
                </button>
                <span className="text-white font-medium">{accounts}</span>
                <button
                  onClick={() => setAccounts(prev => Math.min(10, prev + 1))}
                  className="p-1 text-accent hover:text-accent-dark hover:bg-dark-200/50 rounded"
                  disabled={accounts >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-dark-200 rounded-full">
              <div 
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${(accounts / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full premium-button py-4 flex items-center justify-center text-lg font-medium">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-gray-300">5-minute setup</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-gray-300">Bank-grade security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-400" />
            <span className="text-gray-300">50K+ active traders</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-gray-300">4.9/5 rating (10K+ reviews)</span>
          </div>
        </div>

        {/* Money-back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <Shield className="h-5 w-5 text-accent" />
            <span>14-day money-back guarantee • Cancel anytime • No questions asked</span>
          </div>
        </div>
      </div>
    </div>
  );
}