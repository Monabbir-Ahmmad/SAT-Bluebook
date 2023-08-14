import "./globals.css";

import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
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

      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
