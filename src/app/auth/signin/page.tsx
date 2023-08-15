"use client";

import { Button, Divider } from "@mantine/core";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [providers, setProviders] = useState<any>({});
  const session = useSession();
  const router = useRouter();

  const handleSignin = async (data: LoginReqDTO) => {
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    const getProvidersData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    getProvidersData();
  }, []);

  useEffect(() => {
    if (session?.data) {
      router.replace("/");
    }
  }, [router, session]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-3 p-4">
        <h1 className="text-3xl font-semibold text-center uppercase mb-5 text-slate-600">
          Login to continue
        </h1>
        <LoginForm onSubmit={handleSignin} />

        <Divider my="xs" label="OR" labelPosition="center" />

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

        <p>
          Don&apos;t have an account?{" "}
          <Link className="text-primary font-semibold" href="/auth/signup">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
