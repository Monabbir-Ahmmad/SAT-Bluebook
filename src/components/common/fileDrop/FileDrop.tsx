import { ChangeEvent, DragEvent, forwardRef } from "react";

import RemoveIcon from "remixicon-react/CloseLineIcon";
import { twMerge } from "tailwind-merge";

interface ImagePreviewProps {
  image?: string;
  height?: number;
  onRemoveClick: () => any;
}

interface FileDropProps {
  maxSizeKB?: number;
  allowedMimeTypes?: string[];
  value?: string;
  error?: boolean;
  className?: string;
  previewHeight?: number;
  onChange: (blob?: string) => any;
}

const ImagePreview = ({ image, height, onRemoveClick }: ImagePreviewProps) => {
  if (!image) return null;
  return (
    <div className="relative w-fit">
      <img
        src={image}
        alt="image preview"
        className="object-cover rounded-xl"
        style={{ height }}
      />
      <button
        onClick={onRemoveClick}
        className="absolute top-4 right-4 aspect-square rounded p-1 shadow flex items-center justify-center text-white bg-red-500 hover:bg-red-700 transition-colors"
      >
        <RemoveIcon />
      </button>
    </div>
  );
};

const FileDrop = forwardRef<HTMLDivElement, FileDropProps>(
  (
    {
      maxSizeKB = 1024 * 5,
      allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"],
      onChange,
      value,
      error,
      previewHeight,
      className,
    },
    ref
  ) => {
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
          onChange(URL.createObjectURL(file));
        } else {
          alert("Invalid file type. Please choose a valid file type.");
        }
      } else {
        alert(`File size exceeds the maximum limit of ${maxSizeKB}KB.`);
      }
    };

    const handleRemoveImage = () => onChange(undefined);

    const handelClick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = allowedMimeTypes.join(",");
      input.onchange = (e) => handleFileInputChange(e as any);
      input.click();
    };

    return (
      <div
        ref={ref}
        data-testid="file-drop"
        className={twMerge("text-slate-600 w-full", className)}
        onDragEnter={handlePreventDefault}
        onDragLeave={handlePreventDefault}
        onDragOver={handlePreventDefault}
        onDrop={handleDrop}
      >
        <ImagePreview
          image={value}
          onRemoveClick={handleRemoveImage}
          height={previewHeight}
        />

        {!value && (
          <div
            onClick={handelClick}
            className={twMerge(
              "cursor-pointer overflow-hidden w-full p-4 flex flex-col items-center justify-center border-2 border-divider border-dashed rounded bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors",
              error && "border-red-300 bg-red-50 hover:bg-red-100"
            )}
          >
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs">PNG, JPG or JPEG (MAX. {maxSizeKB}KB)</p>
          </div>
        )}
      </div>
    );
  }
);

FileDrop.displayName = "FileDrop";

export default FileDrop;
