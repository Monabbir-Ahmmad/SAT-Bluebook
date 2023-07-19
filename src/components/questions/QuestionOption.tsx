import DeleteIcon from "remixicon-react/CloseLineIcon";
import FileDrop from "../common/input/FileDrop";
import Input from "../common/input/Input";
import { useFormContext } from "react-hook-form";

interface QuestionOptionProps extends React.HTMLAttributes<HTMLInputElement> {
  index: number;
  onRemoveClick?: () => void;
}

function QuestionOption({
  index = 0,
  onRemoveClick,
  ...rest
}: QuestionOptionProps) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<QuestionDTO>();

  const pickAnswer = () => {
    const options = getValues("options");
    const newOptions = options.map((option, i) => ({
      ...option,
      isAnswer: i === index,
    }));

    setValue("options", newOptions);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        required
        type="radio"
        name="answer"
        className="radio radio-primary"
      />

      {watch("optionType") === "text" ? (
        <Input
          {...register(`options.${index}.data`, {
            required: "Option is required",
          })}
          placeholder={"Option"}
          inputCss="input-sm"
          error={!!errors?.options?.[index]?.data}
          {...rest}
        />
      ) : (
        <FileDrop
          className="w-96"
          onChange={(file) => setValue(`options.${index}.data`, file as File)}
          value={watch(`options.${index}.data`)}
        />
      )}

      <button
        className="btn btn-circle btn-ghost btn-sm"
        type="button"
        onClick={onRemoveClick}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default QuestionOption;
