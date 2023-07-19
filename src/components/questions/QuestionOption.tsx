import { ChangeEvent, useEffect, useState } from "react";
import { set, useFormContext } from "react-hook-form";

import DeleteIcon from "remixicon-react/CloseLineIcon";
import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import { get } from "http";

interface QuestionOptionProps extends React.HTMLAttributes<HTMLInputElement> {
  index: number;
  onRemoveClick?: () => void;
}

function QuestionOption({
  index = 0,
  onRemoveClick,
  ...rest
}: QuestionOptionProps) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<QuestionDTO>();

  const pickAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { options } = getValues();
    const newOptions = options.map((option: any, i: number) =>
      i === index
        ? { ...option, isAnswer: true }
        : { ...option, isAnswer: false }
    );

    setValue("options", newOptions);
  };

  const handleFileChange = (file: File | undefined) => {
    const { options } = getValues();

    const newOptions = options.map((option: any, i: number) =>
      i === index ? { ...option, image: file } : option
    );

    setValue("options", newOptions);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        required
        type="radio"
        className="radio radio-primary"
        name="answer"
        onChange={pickAnswer}
        checked={watch(`options.${index}.isAnswer`)}
      />

      {watch("optionType") === "text" ? (
        <Input
          {...register(`options.${index}.text`, {
            required: "Option is required",
          })}
          placeholder={"Option"}
          inputCss="input-sm"
          error={!!errors?.options?.[index]?.text}
          {...rest}
        />
      ) : (
        <FileDrop
          className="w-96"
          onChange={handleFileChange}
          value={watch(`options.${index}.image`) as File | undefined}
        />
      )}

      <button
        className="btn btn-circle btn-ghost btn-sm"
        type="button"
        onClick={onRemoveClick}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default QuestionOption;
