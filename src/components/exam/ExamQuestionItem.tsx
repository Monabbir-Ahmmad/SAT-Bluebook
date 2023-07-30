import { Button, Image, TextInput } from "@mantine/core";

import BookmarkIcon from "remixicon-react/Bookmark3LineIcon";
import ExamAnswerOption from "./ExamAnswerOption";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";

type ExamQuestionItemProps = {
  data: ExamQuestionResDTO;
  title: string;
  toggleAnswer: (
    question: ExamQuestionResDTO,
    selectedIndex: number,
    selected: boolean
  ) => void;
  toggleMarkAsWrong: (
    question: ExamQuestionResDTO,
    markedIndex: number,
    selected: boolean
  ) => void;
  toggleMarkForReview: (question: ExamQuestionResDTO, marked: boolean) => void;
  onTextAnswerChange: (question: ExamQuestionResDTO, text: string) => void;
};

function ExamQuestionItem({
  data,
  title,
  toggleAnswer,
  toggleMarkAsWrong,
  toggleMarkForReview,
  onTextAnswerChange,
}: ExamQuestionItemProps) {
  const onAnswerSelect = (selectedIndex: number, selected: boolean) => {
    toggleAnswer(data, selectedIndex, selected);
  };

  const onMarkAsWrong = (markedIndex: number, selected: boolean) => {
    toggleMarkAsWrong(data, markedIndex, selected);
  };

  const onMarkForReview = () => {
    toggleMarkForReview(data, !data.markedForReview);
  };

  const onAnswerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextAnswerChange(data, event.target.value);
  };

  console.log(data.textAnswer);

  return (
    <div className="w-full space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold uppercase opacity-70">{title}</h2>

        <Button
          variant="light"
          color={data.markedForReview ? "yellow" : ""}
          leftIcon={<BookmarkIcon />}
          onClick={onMarkForReview}
        >
          {data.markedForReview ? "Marked for review" : "Mark for review"}
        </Button>
      </div>

      <RichContentRenderer content={data.question} className="text-lg" />

      {data.questionImage && <Image src={data.questionImage} alt="" />}

      <hr className="border-slate-300" />

      <div className="flex flex-col gap-2">
        <h1 className="text-base uppercase font-bold opacity-70">
          {data.optionType === "grid-in" ? "Answer" : "Select an option"}
        </h1>

        {data.optionType === "grid-in" && (
          <TextInput
            size="lg"
            placeholder="Type your answer here..."
            value={data.textAnswer ?? ""}
            onChange={onAnswerInput}
          />
        )}

        {data.optionType !== "grid-in" &&
          data.options.map((option: QuestionOptionDTO, index: number) => (
            <ExamAnswerOption
              key={index}
              index={index}
              option={option}
              optionType={data.optionType}
              selected={data.selectedOption === index}
              markedWrong={data.markedWrong?.includes(index)}
              toggleSelect={onAnswerSelect}
              toggleMarkAsWrong={onMarkAsWrong}
            />
          ))}
      </div>
    </div>
  );
}

export default ExamQuestionItem;
