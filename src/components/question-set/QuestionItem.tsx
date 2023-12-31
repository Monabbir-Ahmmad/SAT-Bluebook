import {
  Accordion,
  Badge,
  Button,
  Divider,
  Image,
  Paper,
  Spoiler,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { QuestionDto, QuestionOptionDto } from "@/dtos/question.dto";

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import { OptionTypes } from "@/constants/enums";
import RichContentRenderer from "../common/richEditor/RichContentRenderer";
import { difficulties } from "@/constants/data";
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

interface QuestionItemProps {
  data: QuestionDto;
  selected?: boolean;
  disabled?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function QuestionItem({
  data,
  selected,
  onAdd,
  onRemove,
  disabled,
}: QuestionItemProps) {
  return (
    <Paper withBorder className="flex flex-col gap-4 w-full p-6">
      <Divider label={<Title order={5}>Question #{data.id}</Title>} />

      {data.passage && (
        <Spoiler
          maxHeight={100}
          showLabel="Show full passage"
          hideLabel="Hide passage"
        >
          <RichContentRenderer content={data.passage} className="text-base" />

          {data.questionImage && <Image src={data.questionImage} alt="" />}
        </Spoiler>
      )}

      <RichContentRenderer content={data.question} className="text-base" />

      {!data.passage && data.questionImage && (
        <Image src={data.questionImage} alt="" />
      )}

      <Divider />

      <Accordion variant="separated">
        <Accordion.Item value="ans">
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

      <div className="flex flex-wrap items-center gap-2">
        Difficulty:{" "}
        <Badge size="lg" variant="outline">
          {difficulties.find((d) => d.value === data.difficulty)?.label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        Tags:{" "}
        {data.tags?.map((tag: string) => (
          <Badge key={tag} size="lg">
            {tag}
          </Badge>
        ))}
      </div>

      {selected ? (
        <Button
          variant="filled"
          color="red"
          className="w-full"
          disabled={disabled}
          onClick={() => onRemove?.(data.id)}
        >
          Remove from list
        </Button>
      ) : (
        <Button
          variant="filled"
          className="w-full"
          disabled={disabled}
          onClick={() => onAdd?.(data.id)}
        >
          Add to list
        </Button>
      )}
    </Paper>
  );
}
