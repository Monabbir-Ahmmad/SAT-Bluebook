"use client";

import { Button, Divider, Paper } from "@mantine/core";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginForm from "@/components/auth/LoginForm";
import { LoginReqDto } from "@/dtos/auth.dto";
import { notifications } from "@mantine/notifications";

export default function SigninPage() {
  const [providers, setProviders] = useState<any>({});

  const handleSignin = async (data: LoginReqDto) => {
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      notifications.show({
        title: "Invalid credentials",
        message: "Please provide a valid email address and password.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    const getProvidersData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    getProvidersData();
  }, []);

  return (
    <Paper withBorder radius={"md"} className="p-8 space-y-5">
      <h1 className="text-2xl font-semibold text-text-color">
        Login to continue
      </h1>

      <div className="flex flex-col gap-2">
        {Object.values(providers).map(
          (provider: any) =>
            provider.name !== "Credentials" && (
              <Button
                variant="default"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            )
        )}
      </div>

      <Divider label="Or continue with email" labelPosition="center" />

      <LoginForm onSubmit={handleSignin} />
    </Paper>
  );
}
