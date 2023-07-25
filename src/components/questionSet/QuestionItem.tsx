import { Badge, Button, Image, Text } from "@mantine/core";

import CheckIcon from "remixicon-react/CheckboxCircleLineIcon";
import CrossIcon from "remixicon-react/CloseCircleLineIcon";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { twMerge } from "tailwind-merge";

type QuestionItemProps = {
  question: QuestionDTO;
  onAddToSet: (question: QuestionDTO) => void;
};
type AnswerOptionProps = {
  optionType: OptionType;
  option: QuestionOptionDTO;
  selected: boolean;
};

function AnswerOption({ optionType, option, selected }: AnswerOptionProps) {
  const Icon = selected ? CheckIcon : CrossIcon;

  return (
    <div className="border rounded-lg">
      {optionType !== "grid-in" && (
        <div className="flex">
          <div
            className={twMerge(
              "flex items-center p-2.5 bg-red-500 rounded-l-lg",
              selected && "bg-green-500"
            )}
          >
            <Icon color={"white"} size={35} />
          </div>

          <div className="flex items-center py-2.5 px-4">
            {optionType === "mcq-text" && <Text>{option?.text}</Text>}

            {optionType === "mcq-image" && (
              <Image src={option?.image} alt="" height={200} />
            )}
          </div>
        </div>
      )}

      {optionType === "grid-in" && (
        <p className="text-base px-4 py-2.5">{option?.text}</p>
      )}
    </div>
  );
}

function QuestionComponent({ question, onAddToSet }: QuestionItemProps) {
  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-white border rounded-lg">
      <h2 className="text-xl font-bold uppercase">
        {question.subject} - {question.difficulty}
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        Tags:{" "}
        {question.tags.map((tag) => (
          <Badge key={tag} size="lg">
            {tag}
          </Badge>
        ))}
      </div>

      <hr className="border-2 border-slate-300" />

      <RichContentRenderer content={question.question} className="text-lg" />

      {question.questionImage && <Image src={question.questionImage} alt="" />}

      <hr className="border-2 border-slate-300" />

      <div className="flex flex-col gap-2">
        <h1 className="text-base uppercase font-bold">
          {question.optionType !== "grid-in" ? "Options" : "Answer"}
        </h1>

        {question.options.map((option, index) => (
          <div key={index}>
            <AnswerOption
              option={option}
              selected={question.answers.includes(index)}
              optionType={question.optionType}
            />
          </div>
        ))}
      </div>

      <Button onClick={() => onAddToSet(question)}>Add to Set</Button>
    </div>
  );
}

export default QuestionComponent;
