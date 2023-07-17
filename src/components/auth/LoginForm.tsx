"use client";

import { Controller, useForm } from "react-hook-form";

import Input from "../common/input/Input";
import LockIcon from "remixicon-react/LockLineIcon";
import MailIcon from "remixicon-react/MailLineIcon";

function LoginForm() {
  const { control } = useForm();

  return (
    <form className="flex flex-col gap-3 w-full">
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
          <Input
            {...field}
            type="email"
            label="Email"
            placeholder="Enter your email"
            startIcon={MailIcon}
            error={!!error}
            helperText={error?.message}
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
          <Input
            {...field}
            type="password"
            label="Password"
            placeholder="Enter a strong password"
            startIcon={LockIcon}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <button className="daisy-btn daisy-btn-primary mt-5 rounded">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
