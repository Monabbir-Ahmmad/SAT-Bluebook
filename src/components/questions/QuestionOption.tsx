import { Checkbox, CloseButton, TextInput } from "@mantine/core";

import { ChangeEvent } from "react";
import FileDrop from "../common/fileDrop/FileDrop";
import { useFormContext } from "react-hook-form";

interface QuestionOptionProps {
  index: number;
  onRemoveClick?: () => void;
}

function QuestionOption({ index, onRemoveClick }: QuestionOptionProps) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<QuestionDTO>();

  const pickAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (!checked) {
      setValue(
        "answers",
        getValues("answers").filter((answer) => answer !== index)
      );
    } else {
      setValue("answers", [...getValues("answers"), index]);
    }
  };

  const handleFileChange = (blob?: string) => {
    const options = getValues("options");
    const newOptions = options.map((option: any, i: number) =>
      i === index ? { ...option, image: blob } : option
    );
    setValue("options", newOptions);
  };

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        size={"lg"}
        onChange={pickAnswer}
        checked={watch("answers")?.includes(index)}
        error={!!errors?.answers}
      />

      {watch("optionType") === "image" ? (
        <FileDrop
          className="w-96"
          onChange={handleFileChange}
          value={watch(`options.${index}.image`)}
          error={!!errors?.options?.[index]?.image}
        />
      ) : (
        <TextInput
          {...register(`options.${index}.text`)}
          className="w-96"
          placeholder={"Option"}
          error={!!errors?.options?.[index]?.text}
        />
      )}

      {watch("options").length > 1 && (
        <CloseButton
          radius={"xl"}
          title="Close"
          size="lg"
          iconSize={20}
          onClick={onRemoveClick}
        />
      )}
    </div>
  );
}

export default QuestionOption;
