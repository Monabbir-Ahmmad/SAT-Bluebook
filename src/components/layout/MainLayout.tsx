"use client";

import { AppShell, Button, Header, useMantineTheme } from "@mantine/core";
import { signOut } from "next-auth/react";

import AppLogo from "@/components/common/appLogo/AppLogo";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const theme = useMantineTheme();

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

            <Button
              variant="light"
              radius={"xl"}
              className="ml-auto"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
