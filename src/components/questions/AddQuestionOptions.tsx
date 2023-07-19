import { useFieldArray, useFormContext } from "react-hook-form";

import AddIcon from "remixicon-react/AddLineIcon";
import { ChangeEvent } from "react";
import QuestionOption from "./QuestionOption";

function AddQuestionOptions() {
  const { control, setValue } = useFormContext<QuestionDTO>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onOptionTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("optionType", e.target.checked ? "image" : "text");
    setValue("options", []);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-5 items-center">
        <label className="block font-semibold text-base mb-2">
          Answer Options
        </label>

        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) =>
                setValue("optionType", e.target.checked ? "image" : "text")
              }
            />
            <span className="label-text mx-2">Image Options</span>
          </label>
        </div>
      </div>
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
        onClick={() => append({})}
      >
        <AddIcon /> Add Option
      </button>
    </div>
  );
}

export default AddQuestionOptions;
