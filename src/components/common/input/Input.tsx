"use client";

import { Ref, forwardRef, useState } from "react";

import InvisibleIcon from "remixicon-react/EyeCloseLineIcon";
import VisibleIcon from "remixicon-react/EyeLineIcon";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputCss?: string;
  labelCss?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  startIcon?: React.ComponentType<any>;
}

const Input = forwardRef(
  (
    {
      inputCss,
      labelCss,
      name,
      type,
      label,
      placeholder,
      helperText,
      error,
      startIcon: StartIcon,
      ...rest
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className={twMerge("block text-sm font-semibold mb-2", labelCss)}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              "peer input input-bordered focus:outline-offset-0 focus:outline-1 focus:input-primary w-full",
              inputCss,
              StartIcon && "pl-10",
              type === "password" && "pr-12",
              error && "is-invalid input-error"
            )}
          />

          {StartIcon && (
            <span className="absolute inset-y-0 left-0 inline-flex items-center ml-3 transition-all opacity-50 peer-focus:opacity-100 peer-focus:text-primary peer-[.is-invalid]:text-error">
              <StartIcon size={20} />
            </span>
          )}

          {type === "password" && (
            <span className="p-1 absolute inset-y-0 right-0 inline-flex items-center mr-1">
              <button
                type="button"
                className="p-2 rounded-full flex items-center justify-center outline-none transition-all aspect-square hover:bg-slate-200 active:bg-slate-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <InvisibleIcon size={20} />
                ) : (
                  <VisibleIcon size={20} />
                )}
              </button>
            </span>
          )}
        </div>

        {helperText && (
          <p className={twMerge("text-sm", error && "text-error")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
