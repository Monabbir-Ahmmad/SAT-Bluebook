"use client";

import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
