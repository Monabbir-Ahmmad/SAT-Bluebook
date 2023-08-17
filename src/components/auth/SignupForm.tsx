"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import {
  RiEyeCloseLine as InvisibleIcon,
  RiLockLine as LockIcon,
  RiMailLine as MailIcon,
  RiUserLine as UserIcon,
  RiEyeLine as VisibleIcon,
} from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";
import { signupFormValidator } from "@/lib/client/validators/form.validator";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupFormProps = {
  onSubmit: SubmitHandler<RegisterReqDTO>;
};

function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterReqDTO>({
    resolver: zodResolver(signupFormValidator),
  });

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("name")}
        size="md"
        type="text"
        label="Name"
        placeholder="Enter your name"
        icon={<UserIcon />}
        error={errors.name?.message}
      />

      <TextInput
        {...register("email")}
        size="md"
        type="email"
        label="Email"
        placeholder="Enter your email"
        icon={<MailIcon />}
        error={errors.email?.message}
      />

      <PasswordInput
        {...register("password")}
        size="md"
        label="Password"
        placeholder="Enter a strong password"
        icon={<LockIcon />}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <InvisibleIcon size={size} /> : <VisibleIcon size={size} />
        }
        error={errors.password?.message}
      />

      <PasswordInput
        {...register("confirmPassword")}
        size="md"
        label="Confirm Password"
        placeholder="Enter your password again"
        icon={<LockIcon />}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <InvisibleIcon size={size} /> : <VisibleIcon size={size} />
        }
        error={errors.confirmPassword?.message}
      />

      <div className="flex gap-2 items-center justify-between">
        <Link className="hover:underline text-primary" href="/auth/signin">
          Already have an account? Login
        </Link>

        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );
}

export default SignupForm;
