import { Image, Text, TextInput } from "@mantine/core";

import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { twMerge } from "tailwind-merge";

type AnswerOptionProps = {
  optionType: OptionType;
  option: QuestionOptionDTO;
  selected: boolean;
  index: number;
};

function AnswerOption({
  optionType,
  option,
  selected,
  index,
}: AnswerOptionProps) {
  return (
    <div
      className={twMerge(
        "cursor-pointer bg-white hover:shadow-md border-2 rounded-lg flex items-center py-2.5 px-4 gap-4 transition-shadow",
        selected && "border-primary shadow-md"
      )}
    >
      <span
        className={twMerge(
          "min-w-[2rem] w-8 aspect-square flex items-center justify-center rounded-full border-2 border-slate-300",
          selected && "border-primary bg-primary text-white"
        )}
      >
        {index + 1}
      </span>

      {optionType === "mcq-text" && <Text>{option?.text}</Text>}

      {optionType === "mcq-image" && (
        <Image src={option?.image} alt="" height={200} />
      )}
    </div>
  );
}

type ExamQuestionItemProps = {
  data: QuestionResDTO;
  index: number;
};

function ExamQuestionItem({ data, index = 0 }: ExamQuestionItemProps) {
  return (
    <div
      className={twMerge(
        "text-base shadow-md font-medium flex flex-col gap-4 w-full p-6 bg-white border border-l-8 border-primary"
      )}
    >
      <h2 className="text-xl font-bold uppercase">Question {index + 1}</h2>

      <hr className="border-slate-300" />

      <RichContentRenderer content={data.question} className="text-lg" />

      {data.questionImage && <Image src={data.questionImage} alt="" />}

      <hr className="border-slate-300" />

      <div className="flex flex-col gap-2">
        <h1 className="text-base uppercase font-bold">
          {data.optionType === "grid-in" ? "Answer" : "Options"}
        </h1>

        {data.optionType === "grid-in" && (
          <TextInput size="lg" placeholder="Type your answer here..." />
        )}

        {data.optionType !== "grid-in" &&
          data.options.map((option: QuestionOptionDTO, index: number) => (
            <div key={index}>
              <AnswerOption
                index={index}
                option={option}
                selected={data.answers.includes(index)}
                optionType={data.optionType}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ExamQuestionItem;
