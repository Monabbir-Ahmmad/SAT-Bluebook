"use client";

import { Paper } from "@mantine/core";
import SignupForm from "@/components/auth/SignupForm";
import { authService } from "@/lib/client/services";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: RegisterReqDTO) => {
    try {
      await authService.register(data);

      notifications.show({
        title: "Success",
        message: "Account created successfully",
      });

      router.push("/auth/signin");
    } catch (error: any) {
      console.log(error.response.data.message);
      notifications.show({
        title: "Error",
        message: error.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <Paper withBorder radius={"md"} className="p-8 space-y-5">
      <h1 className="text-2xl font-semibold text-slate-600">
        Create an account
      </h1>

      <SignupForm onSubmit={handleSignup} />
    </Paper>
  );
}
