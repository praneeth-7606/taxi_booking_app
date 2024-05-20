import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { ReactNode } from "react";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
      return <RedirectToSignIn />;
    }

    return <Component {...props} />;
  };
}