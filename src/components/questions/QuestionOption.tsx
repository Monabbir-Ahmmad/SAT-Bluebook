import CheckIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import DeleteIcon from "remixicon-react/CloseLineIcon";
import FileDrop from "../common/input/FileDrop";
import ImageIcon from "remixicon-react/ImageLineIcon";
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
  } = useFormContext<{
    answer: string;
    options: {
      text: string;
      answer?: boolean;
      image?: File | string;
    }[];
  }>();

  const pickAnswer = () => {
    setValue("answer", getValues("options")[index]?.text);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        required
        type="radio"
        name="answer"
        className="radio radio-primary"
        onChange={() => pickAnswer()}
      />

      <Input
        {...register(`options.${index}.text`, {
          required: "Option is required",
        })}
        placeholder={"Option"}
        inputCss="input-sm"
        error={!!errors?.options?.[index]?.text}
        {...rest}
      />

      <FileDrop
        className="w-96"
        onChange={(file) => setValue(`options.${index}.image`, file as File)}
        value={watch(`options.${index}.image`)}
      />

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
