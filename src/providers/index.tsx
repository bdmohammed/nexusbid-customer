"use client";

import { ReactNode } from "react";

import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ThemeProviderWrapper } from "./ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProviderWrapper>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProviderWrapper>
    </QueryProvider>
  );
}
