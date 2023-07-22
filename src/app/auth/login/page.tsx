import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-3 p-4">
        <h1 className="text-3xl font-semibold text-center uppercase mb-5 text-slate-600">
          Login to continue
        </h1>
        <LoginForm />
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
