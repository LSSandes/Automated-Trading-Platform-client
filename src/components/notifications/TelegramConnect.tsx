import React, { useState } from 'react';
import { MessageCircle, Check, Loader } from 'lucide-react';
import { useSendTelegramMessage } from '../../hooks/useTelegram';
import { env } from '../../config/env';

interface TelegramConnectProps {
  onConnect: (chatId: string) => void;
  className?: string;
}

export default function TelegramConnect({ onConnect, className = '' }: TelegramConnectProps) {
  const [verificationCode] = useState(() => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const sendMessage = useSendTelegramMessage();

  const handleConnect = async () => {
    setIsVerifying(true);
    try {
      // Send verification message
      await sendMessage.mutateAsync({
        chatId: '@AutomatedTraderBot',
        text: `🔐 Verification Code: ${verificationCode}\n\nPlease enter this code on the website to complete the connection.`,
        parseMode: 'HTML'
      });

      // In a real implementation, you would:
      // 1. Start polling for the user's message to the bot
      // 2. Verify the code matches
      // 3. Store the chat ID for future notifications
      
      // For demo purposes, we'll simulate success after 2 seconds
      setTimeout(() => {
        setIsVerifying(false);
        onConnect('123456789'); // Replace with actual chat ID
      }, 2000);
    } catch (error) {
      console.error('Failed to send verification message:', error);
      setIsVerifying(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5 text-accent" />
        <span className="text-white">Connect Telegram</span>
      </div>

      <ol className="space-y-4 text-sm text-gray-400">
        <li className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-dark-200/50 flex items-center justify-center text-xs">
            1
          </span>
          <span>Start a chat with {env.TELEGRAM_BOT_USERNAME}</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-dark-200/50 flex items-center justify-center text-xs">
            2
          </span>
          <span>Send the command /start to initialize the bot</span>
        </li>
        <li className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full bg-dark-200/50 flex items-center justify-center text-xs">
            3
          </span>
          <span>Click the button below to receive a verification code</span>
        </li>
      </ol>

      <button
        onClick={handleConnect}
        disabled={isVerifying}
        className="premium-button w-full flex items-center justify-center"
      >
        {isVerifying ? (
          <>
            <Loader className="h-5 w-5 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <Check className="h-5 w-5 mr-2" />
            Connect Telegram
          </>
        )}
      </button>
    </div>
  );
}