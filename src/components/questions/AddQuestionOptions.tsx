import { Button, SegmentedControl } from "@mantine/core";
import { set, useFieldArray, useFormContext } from "react-hook-form";

import AddIcon from "remixicon-react/AddLineIcon";
import QuestionOption from "./QuestionOption";

function AddQuestionOptions() {
  const { control, getValues, register, reset } = useFormContext<QuestionDTO>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onOptionTypeChange = (value: "text" | "image") => {
    reset({ ...getValues(), optionType: value, options: [{}], answers: [] });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="font-semibold text-base">Type</label>
        <SegmentedControl
          fullWidth
          color="blue"
          size="md"
          data={[
            { value: "text", label: "Text" },
            { value: "image", label: "Image" },
          ]}
          onChange={onOptionTypeChange}
        />
      </div>

      <div className="space-y-2">
        <h6 className="font-semibold">Options</h6>
        {fields.map((option, index) => (
          <QuestionOption
            key={option.id}
            index={index}
            onRemoveClick={() => remove(index)}
          />
        ))}
      </div>

      <Button onClick={() => append({})} variant="light">
        <AddIcon /> Add Option
      </Button>
    </div>
  );
}

export default AddQuestionOptions;
