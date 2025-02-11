import React from 'react';
import { Shield, Zap, Bot, Users, ArrowRight, Check, Star } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Pro Trader",
    price: 49.99,
    description: "Perfect for serious traders who want advanced automation",
    icon: <Bot className="h-6 w-6" />,
    color: "from-accent to-accent-dark",
    popular: true,
    cta: "Upgrade to Pro",
    features: [
      { text: "Unlimited webhooks", included: true },
      { text: "Advanced risk management", included: true },
      { text: "Priority trade execution", included: true },
      { text: "Real-time analytics", included: true },
      { text: "Copy trading access", included: true },
      { text: "24/7 priority support", included: true }
    ]
  },
  {
    name: "Signal Provider",
    price: 99.99,
    description: "For traders who want to monetize their strategies",
    icon: <Zap className="h-6 w-6" />,
    color: "from-purple-500 to-purple-600",
    cta: "Start Earning",
    features: [
      { text: "All Pro features", included: true },
      { text: "Sell your signals", included: true },
      { text: "Custom pricing", included: true },
      { text: "Performance analytics", included: true },
      { text: "Subscriber management", included: true },
      { text: "Revenue dashboard", included: true }
    ]
  },
  {
    name: "Enterprise",
    price: 299.99,
    description: "Custom solutions for professional trading firms",
    icon: <Shield className="h-6 w-6" />,
    color: "from-emerald-500 to-emerald-600",
    cta: "Contact Sales",
    features: [
      { text: "All Signal Provider features", included: true },
      { text: "Custom integration", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLA guarantee", included: true },
      { text: "Custom reporting", included: true },
      { text: "White label option", included: true }
    ]
  }
];

export default function UpsellSection() {
  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-8
                        border border-accent/20 backdrop-blur-sm">
            <Star className="h-4 w-4 mr-2" />
            <span>Upgrade Your Trading</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Trading Edge
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unlock advanced features and take your trading to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`glass-panel rounded-xl p-8 relative ${
                plan.popular ? 'border-2 border-accent' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`p-3 rounded-lg bg-gradient-to-br ${plan.color} w-fit mb-6`}>
                {plan.icon}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className={`h-5 w-5 ${
                      feature.included ? 'text-accent' : 'text-gray-500'
                    }`} />
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-lg transition-all flex items-center justify-center ${
                plan.popular
                  ? 'premium-button'
                  : 'border border-accent/30 text-accent hover:bg-accent/10'
              }`}>
                {plan.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-gray-300">50K+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-gray-300">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">4.9/5 Rating (10K+ Reviews)</span>
            </div>
          </div>
          <p className="text-gray-400 mt-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}