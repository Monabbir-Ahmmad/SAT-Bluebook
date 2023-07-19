"use client";

import { Ref, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputCss?: string;
  labelCss?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
}

const FileInput = forwardRef(
  (
    { inputCss, labelCss, name, label, helperText, error, ...rest }: InputProps,
    ref: Ref<HTMLInputElement>
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
          <input
            id={name}
            name={name}
            type={"file"}
            ref={ref}
            {...rest}
            className={twMerge(
              "peer file-input file-input-bordered focus:outline-offset-0 focus:outline-1 focus:file-input-primary w-full",
              inputCss,
              error && "is-invalid file-input-error"
            )}
          />
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

FileInput.displayName = "FileInput";

export default FileInput;
