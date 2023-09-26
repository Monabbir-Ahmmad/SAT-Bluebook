"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import {
  RiEyeCloseLine as InvisibleIcon,
  RiLockLine as LockIcon,
  RiMailLine as MailIcon,
  RiEyeLine as VisibleIcon,
} from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { LoginReqDto } from "@/dtos/auth.dto";
import { signinValidationSchema } from "@/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormProps = {
  onSubmit: SubmitHandler<LoginReqDto>;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReqDto>({
    resolver: zodResolver(signinValidationSchema),
  });

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("email")}
        type="email"
        label="Email"
        size="md"
        placeholder="Enter your email"
        icon={<MailIcon />}
        error={errors.email?.message}
      />

      <PasswordInput
        {...register("password")}
        label="Password"
        size="md"
        placeholder="Enter a strong password"
        icon={<LockIcon />}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <InvisibleIcon size={size} /> : <VisibleIcon size={size} />
        }
        error={errors.password?.message}
      />

      <div className="flex gap-2 items-center justify-between">
        <Link className="hover:underline text-primary" href="/auth/signup">
          Don&apos;t have an account? Register
        </Link>

        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
