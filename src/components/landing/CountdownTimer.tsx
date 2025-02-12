import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  duration: number; // Duration in minutes
}

export default function CountdownTimer({ duration }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 text-accent">
      <Clock className="h-4 w-4" />
      <span className="font-medium">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}