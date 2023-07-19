import React, { ChangeEvent, DragEvent } from "react";

import Image from "next/image";
import RemoveIcon from "remixicon-react/CloseLineIcon";
import { twMerge } from "tailwind-merge";

interface ImagePreviewProps {
  image?: File | string;
  onRemoveClick: () => any;
}

interface FileDropProps {
  maxSizeKB?: number;
  allowedMimeTypes?: string[];
  onChange: (file: File | null) => any;
  value?: File | string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onRemoveClick,
}) => {
  if (!image) return null;
  return (
    <div className="relative">
      <Image
        src={image instanceof File ? URL.createObjectURL(image) : image}
        alt="image preview"
        width={500}
        height={500}
        className="object-cover max-h-64 h-full w-full rounded-xl"
      />
      <button
        onClick={onRemoveClick}
        className="btn btn-circle btn-error btn-sm absolute top-4 right-4"
      >
        <RemoveIcon />
      </button>
    </div>
  );
};

const FileDrop: React.FC<FileDropProps> = ({
  maxSizeKB = 1024 * 5,
  allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"],
  onChange,
  value,
  className,
}) => {
  const handlePreventDefault = (e: DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    if (file.size <= maxSizeKB * 1024) {
      if (allowedMimeTypes.includes(file.type)) {
        onChange(file);
      } else {
        alert("Invalid file type. Please choose a valid file type.");
      }
    } else {
      alert(`File size exceeds the maximum limit of ${maxSizeKB}KB.`);
    }
  };

  const handleRemoveImage = () => onChange(null);

  return (
    <div
      data-testid="file-drop"
      className={twMerge("w-full", className)}
      onDragEnter={handlePreventDefault}
      onDragLeave={handlePreventDefault}
      onDragOver={handlePreventDefault}
      onDrop={handleDrop}
    >
      <ImagePreview image={value} onRemoveClick={handleRemoveImage} />

      {!value && (
        <div>
          <label
            htmlFor="file-drop-input"
            className="cursor-pointer overflow-hidden w-full p-4 flex flex-col items-center justify-center border-2 border-divider border-dashed rounded bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
          >
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs">PNG, JPG or JPEG (MAX. 5MB)</p>
            <input
              id="file-drop-input"
              type="file"
              accept={allowedMimeTypes.join(",")}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FileDrop;
