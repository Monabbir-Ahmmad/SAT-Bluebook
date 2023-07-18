"use client";

import { Ref, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  inputCss?: string;
  labelCss?: string;
  options: { value: any; label: any }[];
  label?: string;
  helperText?: string;
  error?: boolean;
  startIcon?: React.ComponentType<any>;
}

const Select = forwardRef(
  (
    {
      inputCss,
      labelCss,
      name,
      label,
      placeholder,
      helperText,
      error,
      startIcon: StartIcon,
      options,
      ...rest
    }: InputProps,
    ref: Ref<HTMLSelectElement>
  ) => {
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
          <select
            id={name}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={twMerge(
              "peer input input-bordered focus:outline-offset-0 focus:outline-1 focus:input-primary w-full",
              inputCss,
              StartIcon && "pl-10",
              error && "is-invalid input-error"
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {StartIcon && (
            <span className="absolute inset-y-0 left-0 inline-flex items-center ml-3 transition-all opacity-50 peer-focus:opacity-100 peer-focus:text-primary peer-[.is-invalid]:text-error">
              <StartIcon size={20} />
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

Select.displayName = "Select";

export default Select;
