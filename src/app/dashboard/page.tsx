'use server';

import { auth } from '@/auth';
import { Dashboard } from '@/components/Dashboard';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// Simulando dados do usuário

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect('/login');
  }

  return <Dashboard session={session}></Dashboard>;
}
