"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import { signupFormValidator } from "@/lib/client/validators/formValidators";

import InvisibleIcon from "remixicon-react/EyeCloseLineIcon";
import LockIcon from "remixicon-react/LockLineIcon";
import MailIcon from "remixicon-react/MailLineIcon";
import UserIcon from "remixicon-react/UserLineIcon";
import VisibleIcon from "remixicon-react/EyeLineIcon";
import { SubmitHandler, useForm } from "react-hook-form";
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
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        {...register("name")}
        size="lg"
        type="text"
        label="Name"
        placeholder="Enter your name"
        icon={<UserIcon />}
        error={errors.name?.message}
      />

      <TextInput
        {...register("email")}
        size="lg"
        type="email"
        label="Email"
        placeholder="Enter your email"
        icon={<MailIcon />}
        error={errors.email?.message}
      />

      <PasswordInput
        {...register("password")}
        size="lg"
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
        size="lg"
        label="Confirm Password"
        placeholder="Enter your password again"
        icon={<LockIcon />}
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <InvisibleIcon size={size} /> : <VisibleIcon size={size} />
        }
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" uppercase>
        Create Account
      </Button>
    </form>
  );
}

export default SignupForm;
