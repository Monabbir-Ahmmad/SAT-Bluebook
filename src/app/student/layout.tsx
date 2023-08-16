"use client";

import MainLayout from "@/components/layout/MainLayout";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
