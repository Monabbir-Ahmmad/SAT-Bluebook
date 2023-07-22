"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import InvisibleIcon from "remixicon-react/EyeCloseLineIcon";
import LockIcon from "remixicon-react/LockLineIcon";
import MailIcon from "remixicon-react/MailLineIcon";
import VisibleIcon from "remixicon-react/EyeLineIcon";

function SignupForm() {
  const { control, watch, handleSubmit } = useForm();

  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          validate: (value) => !!value.trim() || "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email is invalid",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            {...field}
            size="lg"
            type="email"
            label="Email"
            placeholder="Enter your email"
            icon={<MailIcon />}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
          maxLength: {
            value: 20,
            message: "Password can have at most 20 characters",
          },
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.,;+_=\/\\\$%\^&\*\-])/,
            message:
              "Password must contain at least one uppercase, one lowercase, one number and one special character",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            {...field}
            size="lg"
            label="Password"
            placeholder="Enter a strong password"
            icon={<LockIcon />}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? (
                <InvisibleIcon size={size} />
              ) : (
                <VisibleIcon size={size} />
              )
            }
            error={error?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        }}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            {...field}
            size="lg"
            label="Confirm Password"
            placeholder="Enter your password again"
            icon={<LockIcon />}
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? (
                <InvisibleIcon size={size} />
              ) : (
                <VisibleIcon size={size} />
              )
            }
            error={error?.message}
          />
        )}
      />

      <Button type="submit" uppercase>
        Create Account
      </Button>
    </form>
  );
}

export default SignupForm;
