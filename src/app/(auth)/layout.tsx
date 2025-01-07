import { auth } from '@/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    return <>{children}</>;
  }

  redirect('/dashboard');
}
