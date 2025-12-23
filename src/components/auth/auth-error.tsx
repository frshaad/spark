import { AlertCircle } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

interface AuthErrorProps {
  message: string | null;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <Alert className="border-destructive/50 bg-destructive/10 text-destructive flex">
      <AlertCircle className="size-4" />
      <div className="text-sm font-medium">{message}</div>
    </Alert>
  );
}
