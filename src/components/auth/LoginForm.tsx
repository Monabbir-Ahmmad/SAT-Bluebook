"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import InvisibleIcon from "remixicon-react/EyeCloseLineIcon";
import LockIcon from "remixicon-react/LockLineIcon";
import MailIcon from "remixicon-react/MailLineIcon";
import VisibleIcon from "remixicon-react/EyeLineIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormValidator } from "@/lib/client/validators/formValidators";

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
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        {...register("email")}
        type="email"
        label="Email"
        size="lg"
        placeholder="Enter your email"
        icon={<MailIcon />}
        error={errors.email?.message}
      />

      <PasswordInput
        {...register("password")}
        label="Password"
        size="lg"
        placeholder="Enter a strong password"
        icon={<LockIcon />}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <InvisibleIcon size={size} /> : <VisibleIcon size={size} />
        }
        error={errors.password?.message}
      />

      <Button type="submit" uppercase>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
