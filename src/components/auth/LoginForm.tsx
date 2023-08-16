"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";

import InvisibleIcon from "remixicon-react/EyeCloseLineIcon";
import Link from "next/link";
import LockIcon from "remixicon-react/LockLineIcon";
import MailIcon from "remixicon-react/MailLineIcon";
import VisibleIcon from "remixicon-react/EyeLineIcon";
import { loginFormValidator } from "@/lib/client/validators/form.validator";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormProps = {
  onSubmit: SubmitHandler<LoginReqDTO>;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReqDTO>({
    resolver: zodResolver(loginFormValidator),
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
        <Link className="hover:underline" href="/auth/signup">
          Don&apos;t have an account? Register
        </Link>

        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
