"use client";

import {
  AppShell,
  Burger,
  Button,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";

import AppLogo from "@/components/common/appLogo/AppLogo";
import { IconType } from "react-icons/lib";
import NavbarLink from "./NavbarLink";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationLink {
  label: string;
  href: string;
  icon: IconType;
}

interface MainLayoutProps {
  children: React.ReactNode;
  navLinks?: NavigationLink[];
}

export default function MainLayout({ navLinks, children }: MainLayoutProps) {
  const theme = useMantineTheme();
  const router = useRouter();
  const session = useSession();
  const [navOpened, setNavOpened] = useState(false);

  return (
    <AppShell
      padding={0}
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint={navLinks?.length ? "sm" : "xl"}
      navbar={
        navLinks?.length ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!navOpened}
            width={{ xs: 300 }}
          >
            <Navbar.Section grow className="space-y-2">
              {navLinks.map((link) => (
                <NavbarLink key={link.href} {...link} />
              ))}
            </Navbar.Section>
          </Navbar>
        ) : undefined
      }
      header={
        <Header height={60}>
          <div className="px-4 flex items-center h-full">
            {!!navLinks?.length && (
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={navOpened}
                  onClick={() => setNavOpened((prev) => !prev)}
                  size="sm"
                  mr="lg"
                />
              </MediaQuery>
            )}

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
