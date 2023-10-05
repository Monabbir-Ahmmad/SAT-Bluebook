import { ChangeEvent, useEffect, useRef } from "react";
import { Checkbox, CloseButton } from "@mantine/core";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";

import FileDrop from "../common/fileDrop/FileDrop";
import { OptionTypes } from "@/constants/enums";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import { buttonListMini } from "../common/richEditor/buttonList";
import { debounce } from "@/lib/client/utils/common.util";
import { useFormContext } from "react-hook-form";

interface QuestionOptionProps {
  index: number;
  onRemoveClick?: () => void;
}

export default function QuestionOption({
  index,
  onRemoveClick,
}: QuestionOptionProps) {
  const {
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<QuestionCreateReqDto>();

  const textOptionRef = useRef<IRichEditor>(null);

  useEffect(() => {
    if (textOptionRef.current) {
      textOptionRef.current.onChange = debounce((content) => {
        setValue(
          `options.${index}.text`,
          textOptionRef.current?.getCharCount?.() ? content : undefined
        );
      }, 200);
    }
  }, [setValue, textOptionRef]);

  useEffect(() => {
    if (errors?.options?.[index]?.text)
      textOptionRef.current?.noticeOpen?.(
        errors?.options?.[index]?.text?.message!
      );
  }, [errors?.options?.[index]?.text]);

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
    setValue(`options.${index}.image`, blob);
  };

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        size={"lg"}
        onChange={pickAnswer}
        checked={watch("answers")?.includes(index)}
        error={!!errors?.answers}
      />

      {watch("optionType") === OptionTypes.MCQ_IMAGE && (
        <FileDrop
          onChange={handleFileChange}
          value={watch(`options.${index}.image`)}
          error={!!errors?.options?.[index]?.image}
          previewHeight={200}
        />
      )}

      {watch("optionType") === OptionTypes.MCQ_TEXT && (
        <RichEditor
          ref={textOptionRef}
          minHeight="60px"
          width="100%"
          resizingBar={false}
          placeholder={"Option " + (index + 1)}
          buttonList={buttonListMini}
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
