"use client";

import { AppShell, Button, Header, useMantineTheme } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

import AppLogo from "@/components/common/appLogo/AppLogo";
import { useRouter } from "next/navigation";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useMantineTheme();
  const router = useRouter();
  const session = useSession();

  return (
    <AppShell
      styles={{
        main: {
          padding: 0,
          paddingTop: 60,
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      header={
        <Header height={60}>
          <div className="px-4 flex items-center h-full">
            <AppLogo />

            {session.data ? (
              <Button
                variant="light"
                radius={"xl"}
                className="ml-auto"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            ) : (
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="light"
                  radius={"xl"}
                  onClick={() => router.push("/auth/signup")}
                >
                  Register
                </Button>
                <Button
                  variant="light"
                  radius={"xl"}
                  onClick={() => router.push("/auth/signin")}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
