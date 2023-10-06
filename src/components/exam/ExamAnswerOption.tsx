import { ActionIcon, Divider, Image, Tooltip } from "@mantine/core";
import {
  RiCloseFill as CloseIcon,
  RiArrowGoBackFill as UndoIcon,
} from "react-icons/ri";

import { OptionTypes } from "@/constants/enums";
import { QuestionOptionDto } from "@/dtos/question.dto";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { twMerge } from "tailwind-merge";

type ExamAnswerOptionProps = {
  optionType: OptionTypes;
  option: QuestionOptionDto;
  selected?: boolean;
  markedWrong?: boolean;
  toggleSelect: (index: number, selected: boolean) => void;
  toggleMarkAsWrong: (index: number, selected: boolean) => void;
  index: number;
};

function ExamAnswerOption({
  optionType,
  option,
  selected,
  markedWrong,
  toggleSelect,
  toggleMarkAsWrong,
  index,
}: ExamAnswerOptionProps) {
  const onMarkAsWrong = () => {
    toggleMarkAsWrong(index, !markedWrong);

    if (selected) {
      toggleSelect(index, false);
    }
  };

  const onSelect = () => {
    toggleSelect(index, !selected);

    if (markedWrong) {
      toggleMarkAsWrong(index, false);
    }
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <div
        className={twMerge(
          "w-full relative cursor-pointer bg-white hover:shadow-md border-2 rounded-lg flex items-center py-2.5 px-4 gap-4 transition-all",
          selected && "border-primary",
          markedWrong && "bg-slate-50"
        )}
        onClick={onSelect}
      >
        <Divider
          hidden={!markedWrong}
          className="absolute -inset-x-2 top-1/2 z-10"
          color="dark"
        />

        <span
          className={twMerge(
            "min-w-[2rem] w-8 aspect-square flex items-center justify-center rounded-full border-2 border-slate-300 transition-all",
            selected && "border-primary bg-primary text-white"
          )}
        >
          {index + 1}
        </span>

        {optionType === OptionTypes.MCQ_TEXT && (
          <RichContentRenderer content={option?.text!} className="text-base" />
        )}

        {optionType === OptionTypes.MCQ_IMAGE && (
          <Image src={option?.image} alt="" height={200} />
        )}
      </div>

      <Tooltip label={markedWrong ? "Undo mark" : "Mark as wrong"} withArrow>
        <ActionIcon size="xl" radius="xl" onClick={onMarkAsWrong}>
          {markedWrong ? <UndoIcon size={25} /> : <CloseIcon size={25} />}
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

export default ExamAnswerOption;
