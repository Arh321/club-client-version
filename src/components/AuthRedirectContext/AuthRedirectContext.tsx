// app/context/AuthRedirectContext.tsx
"use client";

import { createContext, useContext, useCallback } from "react";
import { useNavigate } from "react-router";

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
  const router = useNavigate();

  const redirectToLogin = useCallback(() => {
    router("/login");
  }, [router]);

  return (
    <AuthRedirectContext.Provider value={{ redirectToLogin }}>
      {children}
    </AuthRedirectContext.Provider>
  );
};
