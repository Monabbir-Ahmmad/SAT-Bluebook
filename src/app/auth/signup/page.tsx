import Link from "next/link";
import React from "react";
import SignupForm from "@/components/auth/SignupForm";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-3 p-4">
        <h1 className="text-3xl font-bold text-center uppercase mb-5">
          Create an account
        </h1>
        <SignupForm />
        <p>
          Already have an account?{" "}
          <Link className="link-primary font-semibold" href="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
