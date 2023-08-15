"use client";

import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import { authService } from "@/lib/client/services";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (data: RegisterReqDTO) => {
    try {
      const res = await authService.register(data);

      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-3 p-4">
        <h1 className="text-3xl font-semibold text-center uppercase mb-5 text-slate-600">
          Create an account
        </h1>
        <SignupForm onSubmit={handleSignup} />
        <p>
          Already have an account?{" "}
          <Link className="text-primary font-semibold" href="/auth/signin">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
