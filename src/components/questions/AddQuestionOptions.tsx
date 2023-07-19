import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import AddIcon from "remixicon-react/AddLineIcon";
import QuestionOption from "./QuestionOption";

interface AddQuestionOptionsProps {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
}

function AddQuestionOptions() {
  const { control } = useFormContext<{
    options: { text: string }[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <div className="space-y-4">
      {fields.map((option, index) => (
        <QuestionOption
          key={option.id}
          index={index}
          onRemoveClick={() => remove(index)}
        />
      ))}

      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => append({ text: "" })}
      >
        <AddIcon /> Add Option
      </button>
    </div>
  );
}

export default AddQuestionOptions;
