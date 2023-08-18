import { Button, Divider, Group, Image, TextInput } from "@mantine/core";

import { RiBookmark3Line as BookmarkIcon } from "react-icons/ri";
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

  return (
    <div
      className={
        "flex divide-x-4 flex-col md:flex-row min-h-[calc(100vh-195px)]"
      }
    >
      {data.passage && (
        <section className="overflow-y-auto md:max-h-[calc(100vh-195px)] flex-1">
          <div className="space-y-5 max-w-3xl mx-auto w-full p-6">
            <Divider
              label={<span className="text-xl text-text-color">Passage</span>}
              labelPosition="center"
            />

            <RichContentRenderer
              content={data.passage + data.passage + data.passage}
              className="text-lg"
            />

            {data.questionImage && <Image src={data.questionImage} alt="" />}
          </div>
        </section>
      )}

      <section className="overflow-y-auto md:max-h-[calc(100vh-195px)] flex-1">
        <div className="space-y-5 max-w-3xl mx-auto w-full p-6">
          <Group noWrap position="apart">
            <h2 className="text-xl font-semibold text-text-color">{title}</h2>

            <Button
              variant="light"
              color={data.markedForReview ? "yellow" : ""}
              leftIcon={<BookmarkIcon size={20} />}
              onClick={onMarkForReview}
            >
              {data.markedForReview ? "Marked for review" : "Mark for review"}
            </Button>
          </Group>

          <RichContentRenderer content={data.question} className="text-lg" />

          {!data.passage && data.questionImage && (
            <Image src={data.questionImage} alt="" />
          )}

          <Divider />

          <div className="flex flex-col gap-2">
            <h2 className="text-base uppercase font-semibold text-text-color">
              {data.optionType === "grid-in" ? "Answer" : "Select an option"}
            </h2>

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
      </section>
    </div>
  );
}

export default ExamQuestionItem;
