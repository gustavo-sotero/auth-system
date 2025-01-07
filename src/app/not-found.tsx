import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center">
            404
          </CardTitle>
          <CardDescription className="text-xl text-center">
            Página não encontrada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
