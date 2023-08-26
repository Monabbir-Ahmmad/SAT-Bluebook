"use client";

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import { Paper } from "@mantine/core";
import { RegisterReqDTO } from "@/dtos/auth.dto";
import SignupForm from "@/components/auth/SignupForm";
import { authService } from "@/lib/client/services";
import { notifications } from "@mantine/notifications";
import useQuery from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { request: signupRequest } = useQuery({
    requestFn: authService.register,
    onRequest: () => {
      notifications.show({
        id: "signup",
        title: "Signing up",
        message: "Please wait while we create an account for you.",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      notifications.update({
        id: "signup",
        title: "Signed up",
        message: "You have been signed up successfully.",
        color: "green",
        icon: <CheckIcon />,
      });

      router.push("/auth/signin");
    },
    onError: (err: any) => {
      notifications.update({
        id: "signup",
        title: "Error",
        message: err.response.data.message,
        color: "red",
      });
    },
  });

  const handleSignup = async (data: RegisterReqDTO) => {
    signupRequest(data);
  };

  return (
    <Paper withBorder radius={"md"} className="p-8 space-y-5">
      <h1 className="text-2xl font-semibold text-text-color">
        Create an account
      </h1>

      <SignupForm onSubmit={handleSignup} />
    </Paper>
  );
}
