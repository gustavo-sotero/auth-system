'use client';

import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Loader2, LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { SessionTimer } from './SessionTimer';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

interface SessionProps {
  session: {
    user: {
      name: string;
      email: string;
      image?: string | null;
    };
    session: {
      expiresAt: Date;
      createdAt: Date;
    };
  };
}

export function Dashboard({ session }: SessionProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = session.user;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut();
    setIsLoggingOut(false);
    redirect('/login');
  };
  const handleSessionExpire = () => {
    // Aqui você pode implementar a lógica para lidar com a expiração da sessão
    // Por exemplo, você pode chamar a função de logout ou mostrar um modal
    handleLogout();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Bem-vindo de volta, {user.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.image ?? ''} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saindo...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        <SessionTimer
          expirationAtSession={session.session.expiresAt.getTime()}
          createdAtSession={session.session.createdAt.getTime()}
          onExpire={handleSessionExpire}
        />
      </div>
    </div>
  );
}
