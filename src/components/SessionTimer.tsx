import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface SessionTimerProps {
  createdAtSession: number; // Unix timestamp in milliseconds
  expirationAtSession: number; // Unix timestamp in milliseconds
  onExpire: () => void;
}

export function SessionTimer({
  createdAtSession,
  expirationAtSession,
  onExpire
}: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);
  const [totalDuration] = useState(expirationAtSession - createdAtSession);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, expirationAtSession - now);
      setTimeLeft(remaining);

      const progressValue = (remaining / totalDuration) * 100;
      setProgress(progressValue < 0 ? 0 : progressValue);

      if (remaining <= 0) {
        onExpire();
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [expirationAtSession, onExpire, totalDuration]);

  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Sessão expira em:</span>
          <span className="text-sm font-bold">
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardContent>
    </Card>
  );
}
