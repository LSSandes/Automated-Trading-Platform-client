import { useState } from 'react';
import { Check, Shield, Bot, Zap, Users, Lock, Star, Clock, ArrowRight, DollarSign } from 'lucide-react';
import UpsellModal from './UpsellModal';
import DownsellModal from './DownsellModal';
import AddonsModal from './AddonsModal';

export default function PricingAddons() {
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showDownsell, setShowDownsell] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingTiers = [
    {
      id: 'basic',
      name: "Basic Automation",
      price: {
        monthly: 49,
        yearly: 490
      },
      description: "Essential tools for automated trading",
      icon: <Bot className="h-5 w-5" />,
      upsellTo: 'pro',
      color: "from-gray-500/20 to-gray-500/5",
      features: [
        "5 active webhooks",
        "Basic risk management",
        "Single trading account",
        "Email notifications",
        "Community support",
        "Standard API access",
        "Basic analytics"
      ]
    },
    {
      id: 'pro',
      name: "Professional Trader",
      price: {
        monthly: 99,
        yearly: 990
      },
      description: "Advanced features for serious traders",
      popular: true,
      icon: <Zap className="h-5 w-5" />,
      upsellTo: 'enterprise',
      color: "from-accent/20 to-accent/5",
      features: [
        "20 active webhooks",
        "Advanced risk management",
        "3 trading accounts",
        "Multi-channel notifications",
        "Priority support",
        "Copy trading access",
        "Advanced analytics",
        "Custom indicators",
        "API rate limit 5x higher"
      ]
    },
    {
      id: 'enterprise',
      name: "Trading Firm",
      price: {
        monthly: 299,
        yearly: 2990
      },
      description: "Full-scale trading operations",
      icon: <Lock className="h-5 w-5" />,
      color: "from-purple-500/20 to-purple-500/5",
      features: [
        "Unlimited webhooks",
        "Custom risk protocols",
        "Unlimited accounts",
        "White-label solution",
        "24/7 dedicated support",
        "Advanced API access",
        "Custom feature development",
        "SLA guarantee",
        "Dedicated infrastructure"
      ]
    }
  ];

  interface PricingTier {
    id: string;
    name: string;
    price: {
      monthly: number;
      yearly: number;
    };
    description: string;
    icon: JSX.Element;
    upsellTo?: string;
    color: string;
    features: string[];
    popular?: boolean;
  }

  const handlePlanSelect = (plan: PricingTier) => {
    setSelectedPlan(plan);
    if (plan.upsellTo) {
      setShowUpsell(true);
    } else {
      setShowAddons(true);
    }
  };

  const handleUpsellDecline = () => {
    setShowUpsell(false);
    setShowDownsell(true);
  };

  const handleDownsellDecline = () => {
    setShowDownsell(false);
    setShowAddons(true);
  };

  const handleAddAddon = (addonId: string) => {
    console.log('Added addon:', addonId);
    setShowAddons(false);
  };

  const savings: { [key: string]: number } = {
    basic: 98,
    pro: 198,
    enterprise: 598
  };

  return (
    <div className="py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-8
                        border border-accent/20 backdrop-blur-sm">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Enterprise Solutions</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Scale Your Trading Operation
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional-grade tools for serious traders and trading firms
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`glass-panel rounded-xl p-8 relative border-2 transition-all duration-300
                         hover:transform hover:scale-105 hover:shadow-2xl ${
                tier.popular 
                  ? 'border-accent shadow-accent/20' 
                  : 'border-dark-300/30'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-6 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`p-3 rounded-lg bg-gradient-to-br ${tier.color} w-fit mb-6`}>
                {tier.icon}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400">{tier.description}</p>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">
                  ${billingCycle === 'monthly' ? tier.price.monthly : Math.floor(tier.price.yearly / 12)}
                </span>
                <span className="text-gray-400 ml-2">/month</span>
                {billingCycle === 'yearly' && (
                  <span className="ml-2 text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                    Save ${savings[tier.id]}
                  </span>
                )}
              </div>

              <button
                onClick={() => handlePlanSelect(tier)}
                className={`w-full py-4 rounded-lg transition-all flex items-center justify-center 
                           text-lg font-medium mb-8 ${
                  tier.popular
                    ? 'bg-accent hover:bg-accent-dark text-white'
                    : 'border-2 border-accent/30 text-accent hover:bg-accent/10'
                }`}
              >
                {tier.popular ? 'Upgrade Now' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <div className="space-y-4">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-1 rounded-lg ${
                      tier.popular ? 'bg-accent/10' : 'bg-dark-200/50'
                    }`}>
                      <Check className={`h-4 w-4 ${
                        tier.popular ? 'text-accent' : 'text-emerald-400'
                      }`} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-gray-300">Enterprise-grade security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <span className="text-gray-300">500+ trading firms trust us</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <span className="text-gray-300">99.99% uptime SLA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-gray-300">24/7 dedicated support</span>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Need a custom solution? Let's talk about your specific requirements.
          </p>
          <button className="premium-button inline-flex items-center px-8 py-3">
            Contact Enterprise Sales
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <UpsellModal
        isOpen={showUpsell}
        onClose={() => setShowUpsell(false)}
        onDecline={handleUpsellDecline}
        selectedPlan={selectedPlan}
      />

      <DownsellModal
        isOpen={showDownsell}
        onClose={() => setShowDownsell(false)}
        onDecline={handleDownsellDecline}
        selectedPlan={selectedPlan}
      />

      <AddonsModal
        isOpen={showAddons}
        onClose={() => setShowAddons(false)}
        onAddAddon={handleAddAddon}
      />
    </div>
  );
}