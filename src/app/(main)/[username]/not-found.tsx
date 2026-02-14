'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfileNotFound() {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon with gradient background */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="bg-primary/10 absolute inset-0 rounded-full blur-3xl" />
            <div className="bg-card border-border relative rounded-full border-2 p-6">
              <UserX
                className="text-muted-foreground h-16 w-16"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight text-balance">
              User not found
            </h2>
          </div>

          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed text-balance">
            This account doesn't exist or may have been deactivated.
          </p>
        </div>

        {/* Actions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="flex flex-col gap-2">
            <Link href="/">
              <Button className="w-full" size="lg">
                <Home className="mr-2 size-4" />
                Back to Home
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 size-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className="text-muted-foreground text-center text-sm">
          Error Code: <span className="font-mono">NOT_FOUND_404</span>
        </p>
      </div>
    </div>
  );
}
