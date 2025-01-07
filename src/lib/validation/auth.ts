import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  rememberMe: z.boolean().default(false)
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Endereço de email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Endereço de email inválido')
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  });
