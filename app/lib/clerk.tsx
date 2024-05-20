// lib/clerk.tsx
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const router = useRouter();
  const { pathname } = router;

  // List of public routes
  const isPublic = pathname === '/sign-in' || pathname === '/sign-up';

  if (!isPublic) {
    return (
      <ClerkProvider>
        <RedirectToSignIn />
      </ClerkProvider>
    );
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
