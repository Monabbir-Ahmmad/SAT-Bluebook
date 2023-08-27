"use client";

import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "./ThemeProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
