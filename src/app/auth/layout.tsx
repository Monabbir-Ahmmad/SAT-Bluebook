"use client";

import AppLogo from "@/components/common/appLogo/AppLogo";
import { Paper } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.data) {
      router.replace("/");
    }
  }, [router, session]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-4 space-y-4">
        <AppLogo className="text-center" />
        {children}
      </div>
    </div>
  );
}
