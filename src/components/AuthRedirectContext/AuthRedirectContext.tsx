// app/context/AuthRedirectContext.tsx
"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useCallback } from "react";

type AuthRedirectContextType = {
  redirectToLogin: () => void;
};

const AuthRedirectContext = createContext<AuthRedirectContextType>({
  redirectToLogin: () => {},
});

export const useAuthRedirect = () => useContext(AuthRedirectContext);

export const AuthRedirectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const redirectToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <AuthRedirectContext.Provider value={{ redirectToLogin }}>
      {children}
    </AuthRedirectContext.Provider>
  );
};
