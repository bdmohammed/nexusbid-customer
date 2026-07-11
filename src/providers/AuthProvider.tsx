"use client";

import { ReactNode, useEffect } from "react";

import { useCurrentUser } from "@/features/auth/api/queries";
import { useAuthStore } from "@/features/auth/store/store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, isLoading, isSuccess, isError } = useCurrentUser();

  const { setAuthenticated, setInitializing } = useAuthStore();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSuccess && user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    setInitializing(false);
  }, [user, isLoading, isSuccess, isError, setAuthenticated, setInitializing]);

  return children;
}
