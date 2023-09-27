"use client";

import { Button, Divider, Paper } from "@mantine/core";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginForm from "@/components/auth/LoginForm";
import { LoginReqDto } from "@/dtos/auth.dto";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";

export default function SigninPage() {
  const { data: providers } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });

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

  return (
    <Paper withBorder radius={"md"} className="p-8 space-y-5">
      <h1 className="text-2xl font-semibold text-text-color">
        Login to continue
      </h1>

      {providers && (
        <>
          <div className="flex flex-col gap-4">
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
        </>
      )}

      <LoginForm onSubmit={handleSignin} />
    </Paper>
  );
}
