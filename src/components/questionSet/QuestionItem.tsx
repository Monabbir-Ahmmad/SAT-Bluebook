import {
  Badge,
  Image,
  Text,
  TransferListItemComponentProps,
} from "@mantine/core";

import CheckIcon from "remixicon-react/CheckboxCircleLineIcon";
import CrossIcon from "remixicon-react/CloseCircleLineIcon";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { difficulties } from "@/constants/data";
import { twMerge } from "tailwind-merge";

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

function QuestionItem({ data, selected }: TransferListItemComponentProps) {
  return (
    <div
      className={twMerge(
        "text-base font-medium flex flex-col gap-4 w-full p-6 bg-white border rounded hover:bg-slate-50 hover:shadow-md",
        selected && "border-primary border-t-8"
      )}
    >
      <h2 className="text-xl font-bold uppercase">
        {data.subject} - {difficulties[data.difficulty].label}
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        Tags:{" "}
        {data.tags.map((tag: string) => (
          <Badge key={tag} size="lg">
            {tag}
          </Badge>
        ))}
      </div>

      <hr className="border-slate-300" />

      <RichContentRenderer content={data.question} className="text-lg" />

      {data.questionImage && <Image src={data.questionImage} alt="" />}

      <hr className="border-slate-300" />

      <div className="flex flex-col gap-2">
        <h1 className="text-base uppercase font-bold">
          {data.optionType !== "grid-in" ? "Options" : "Answer"}
        </h1>

        {data.options.map((option: QuestionOptionDTO, index: number) => (
          <div key={index}>
            <AnswerOption
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

export default QuestionItem;
