import { Plus, Bot, Webhook, Users } from 'lucide-react';

interface QuickActionsProps {
  onNewWebhook: () => void;
  onViewChange: (view: string) => void;
}

export default function QuickActions({ onNewWebhook, onViewChange }: QuickActionsProps) {
  const actions = [
    {
      icon: <Webhook className="h-6 w-6 text-accent" />,
      title: "Create Webhook",
      description: "Set up a new TradingView webhook",
      buttonText: "New Webhook",
      onClick: onNewWebhook
    },
    {
      icon: <Bot className="h-6 w-6 text-purple-400" />,
      title: "Trading Bot",
      description: "Configure automated trading strategy",
      buttonText: "Coming Soon",
      comingSoon: true,
      onClick: () => {}
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: "Copy Trading",
      description: "Follow top-performing traders",
      buttonText: "Browse Traders",
      onClick: () => onViewChange('leaderboard')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <div 
          key={index}
          className="glass-panel glass-panel-hover rounded-xl p-6 border border-dark-300/30"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-dark-200/50 rounded-lg">
              {action.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium text-white">{action.title}</h3>
                {action.comingSoon && (
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mt-1">{action.description}</p>
              <button
                onClick={action.onClick}
                disabled={action.comingSoon}
                className={`mt-4 w-full flex items-center justify-center ${
                  action.comingSoon
                    ? 'bg-dark-300 text-gray-500 cursor-not-allowed'
                    : 'premium-button'
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                {action.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}