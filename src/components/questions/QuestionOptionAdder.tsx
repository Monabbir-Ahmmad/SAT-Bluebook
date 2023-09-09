import { Button, SegmentedControl, Text, TextInput } from "@mantine/core";
import { useFieldArray, useFormContext } from "react-hook-form";

import { RiAddLine as AddIcon } from "react-icons/ri";
import { OptionTypes } from "@/constants/enums";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import QuestionOption from "./QuestionOption";
import { answerType } from "@/constants/data";
import { useMediaQuery } from "@mantine/hooks";

export default function QuestionOptionAdder() {
  const largeScreen = useMediaQuery("(min-width: 60em)");
  const {
    control,
    getValues,
    reset,
    watch,
    register,
    formState: { errors },
  } = useFormContext<QuestionCreateReqDto>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onOptionTypeChange = (value: OptionTypes) => {
    if (value === OptionTypes.GRID_IN) {
      reset({ ...getValues(), optionType: value, options: [{}], answers: [0] });
      return;
    }

    reset({ ...getValues(), optionType: value, options: [{}], answers: [] });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Text fz={"lg"} fw={500} mb={"xs"}>
          Type
        </Text>
        <SegmentedControl
          orientation={largeScreen ? "horizontal" : "vertical"}
          fullWidth
          color="blue"
          size="md"
          data={answerType}
          onChange={onOptionTypeChange}
        />
      </div>

      {watch("optionType") === OptionTypes.GRID_IN && (
        <TextInput
          {...register("options.0.text")}
          label="Text Answer"
          labelProps={{
            className: "font-semibold text-lg mb-2 text-text-color",
          }}
          size="lg"
          placeholder="Type the answer here"
          error={!!errors?.options?.[0]?.text}
        />
      )}

      {watch("optionType") !== OptionTypes.GRID_IN && (
        <>
          <div className="space-y-2">
            <Text fz={"lg"} fw={500} mb={"xs"}>
              Options
            </Text>
            {fields.map((option, index) => (
              <QuestionOption
                key={option.id}
                index={index}
                onRemoveClick={() => remove(index)}
              />
            ))}
          </div>
          <Button
            onClick={() => append({})}
            variant="light"
            leftIcon={<AddIcon size={25} />}
          >
            Add Option
          </Button>
        </>
      )}
    </div>
  );
}
