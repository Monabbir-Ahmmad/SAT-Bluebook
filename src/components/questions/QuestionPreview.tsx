import {
  Accordion,
  Badge,
  Divider,
  Image,
  Spoiler,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { QuestionDto, QuestionOptionDto } from "@/dtos/question.dto";
import { difficulties, sections } from "@/constants/data";

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import { OptionTypes } from "@/constants/enums";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { twMerge } from "tailwind-merge";

type AnswerOptionProps = {
  optionType: OptionTypes;
  option: QuestionOptionDto;
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
          <ThemeIcon
            radius="xl"
            size="lg"
            variant={selected ? "filled" : "outline"}
            color={selected ? "green" : "gray"}
          >
            {selected ? <CheckIcon size={25} /> : ""}
          </ThemeIcon>

          {optionType === OptionTypes.MCQ_TEXT && (
            <RichContentRenderer
              content={option?.text!}
              className="text-base"
            />
          )}

          {optionType === OptionTypes.MCQ_IMAGE && (
            <Image src={option?.image} alt="" height={200} />
          )}
        </div>
      )}

      {optionType === OptionTypes.GRID_IN && <Text>{option?.text}</Text>}
    </div>
  );
}

interface QuestionPreviewProps {
  data: QuestionDto;
}

export default function QuestionPreview({ data }: QuestionPreviewProps) {
  return (
    <div className="flex flex-col gap-4 w-full p-6">
      <Divider
        label={
          <Badge size="xl" variant="outline">
            {sections.find((s) => s.value === data.section)?.label}
          </Badge>
        }
        labelPosition="center"
      />

      <div className="flex flex-wrap items-center gap-2">
        Difficulty:{" "}
        <Badge size="lg">
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

      {data.passage && (
        <>
          <Divider
            labelPosition="center"
            label={
              <h1 className="text-text-color font-semibold text-lg">Passage</h1>
            }
          />

          <Spoiler
            maxHeight={100}
            showLabel="Show full passage"
            hideLabel="Hide passage"
          >
            <RichContentRenderer content={data.passage} className="text-base" />

            {data.questionImage && <Image src={data.questionImage} alt="" />}
          </Spoiler>
        </>
      )}

      <Divider
        labelPosition="center"
        label={
          <h1 className="text-text-color font-semibold text-lg">Question</h1>
        }
      />

      <RichContentRenderer content={data.question} className="text-base" />

      {!data.passage && data.questionImage && (
        <Image src={data.questionImage} alt="" />
      )}

      <Accordion
        chevronPosition="left"
        variant="separated"
        defaultValue={"answer"}
        className="border rounded-md"
      >
        <Accordion.Item value="answer">
          <Accordion.Control>
            {data.optionType !== OptionTypes.GRID_IN ? "Options" : "Answer"}
          </Accordion.Control>
          <Accordion.Panel>
            <div className="divide-y">
              {data.options.map((option: QuestionOptionDto, index: number) => (
                <AnswerOption
                  key={index}
                  option={option}
                  selected={data.answers.includes(index)}
                  optionType={data.optionType}
                />
              ))}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
