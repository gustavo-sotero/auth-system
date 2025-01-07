Coletando informações do workspace

# Sistema de Autenticação Next.js

Sistema completo de autenticação desenvolvido com Next.js, Better Auth, Prisma e TailwindCSS.

## Funcionalidades

- 🔐 Autenticação email/senha
- 🌐 Login social com Google 
- 📧 Recuperação de senha via email
- ⏲️ Gerenciamento de sessão com timer visual
- 🎨 Interface moderna com Tailwind e shadcn/ui
- 🔒 Rotas protegidas
- 📱 Design responsivo

## Tecnologias

- Next.js 15
- Better Auth
- Prisma
- TailwindCSS
- TypeScript
- React Hook Form
- Zod
- Radix UI
- Biome (Linter/Formatter)

## Iniciando

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/auth-system
cd auth-system
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo 

.env

com:

```env
NEXT_PUBLIC_APP_URL=""
DATABASE_URL=""
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
FROM_EMAIL=""
```


4. Execute as migrações:

Para desenvolvimento:
```bash
npx prisma migrate dev
```

Para produção:
```bash
npx prisma db push
```


5. Inicie o servidor de desenvolvimento:

```bash 
npm run dev
```

6. Inicie o servidor de produção:

```bash 
npm run build
```

```bash 
npm run start
```

O projeto estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
src/
  ├── app/              # Rotas e páginas
  ├── components/       # Componentes React
  ├── hooks/           # Hooks customizados
  ├── lib/             # Utilitários e configurações
  └── auth.ts          # Configuração do Better Auth
```

## Licença

Este projeto está sob a licença MIT.

---

Projeto desenvolvido com ❤️ usando Next.js e TypeScript