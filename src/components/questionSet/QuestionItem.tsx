import {
  Badge,
  Checkbox,
  Divider,
  Image,
  Text,
  TransferListItemComponentProps,
} from "@mantine/core";

import { OptionTypes } from "@/constants/enums";
import { QuestionOptionDTO } from "@/dtos/question.dto";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { difficulties } from "@/constants/data";
import { twMerge } from "tailwind-merge";

type AnswerOptionProps = {
  optionType: OptionTypes;
  option: QuestionOptionDTO;
  selected: boolean;
};

function AnswerOption({ optionType, option, selected }: AnswerOptionProps) {
  return (
    <div>
      {optionType !== OptionTypes.GRID_IN && (
        <div
          className={twMerge(
            "flex items-center gap-4 p-4",
            selected && "bg-green-100"
          )}
        >
          <Checkbox
            checked={selected}
            radius={"xl"}
            size={"lg"}
            color="green"
          />

          {optionType === OptionTypes.MCQ_TEXT && <Text>{option?.text}</Text>}

          {optionType === OptionTypes.MCQ_IMAGE && (
            <Image src={option?.image} alt="" height={200} />
          )}
        </div>
      )}

      {optionType === OptionTypes.GRID_IN && (
        <p className="text-base px-4 py-2.5">{option?.text}</p>
      )}
    </div>
  );
}

function QuestionItem({ data, selected }: TransferListItemComponentProps) {
  return (
    <div
      className={twMerge(
        "text-base font-medium flex flex-col gap-4 w-full p-6 bg-white border rounded hover:bg-slate-50 hover:shadow-md transition-all",
        selected && "border-primary border-t-8"
      )}
    >
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl font-bold uppercase">{data.subject}</h2>

        <Badge size="xl" variant="outline">
          {difficulties.find((d) => d.value === data.difficulty)?.label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        Tags:{" "}
        {data.tags.map((tag: string) => (
          <Badge key={tag} size="lg">
            {tag}
          </Badge>
        ))}
      </div>

      <Divider />

      <RichContentRenderer content={data.question} className="text-lg" />

      {data.questionImage && <Image src={data.questionImage} alt="" />}

      <Divider />

      <div className="flex flex-col gap-2">
        <h1 className="text-base uppercase font-bold">
          {data.optionType !== OptionTypes.GRID_IN ? "Options" : "Answer"}
        </h1>

        <div className="border rounded-lg divide-y">
          {data.options.map((option: QuestionOptionDTO, index: number) => (
            <AnswerOption
              key={index}
              option={option}
              selected={data.answers.includes(index)}
              optionType={data.optionType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
