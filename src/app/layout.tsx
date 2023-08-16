import "@/styles/global.css";

import type { Metadata } from "next";
import { Providers } from "@/context/Provider";

export const metadata: Metadata = {
  title: "SAT Bluebook",
  description: "A free, open-source SAT practice test generator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
