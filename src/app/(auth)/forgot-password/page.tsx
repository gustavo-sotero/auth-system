'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { forgotPasswordSchema } from '@/lib/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    await authClient.forgetPassword(
      {
        email: data.email,
        redirectTo: '/reset-password'
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (error) => {
          setSuccess(true);
          setIsLoading(false);
          setError(error.error.message);
        }
      }
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Esqueceu a Senha
          </h2>
        </div>
        {success ? (
          <Alert>
            <AlertDescription>
              Se uma conta existir para esse email, enviamos instruções para
              redefinir a senha.
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço de Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar instruções de redefinição'
                )}
              </Button>
            </form>
          </Form>
        )}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
