import { auth } from '@/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect('/login');
  }
  redirect('/dashboard');
}
