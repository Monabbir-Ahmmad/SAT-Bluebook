import { Alert } from "@mantine/core";
import { RiErrorWarningLine as AlertIcon } from "react-icons/ri";
import { QuestionDto } from "@/dtos/question.dto";
import QuestionItem from "./QuestionItem";

interface PropType {
  questionIds: string[];
  questionMap: Map<string, QuestionDto>;
  disabled?: boolean;
  onAddToList: (id: string) => void;
}

export default function AvailableQuestions({
  questionMap,
  questionIds = [],
  onAddToList,
  disabled,
}: PropType) {
  if (!questionIds.length)
    return (
      <Alert icon={<AlertIcon />} title="No More Questions Available!">
        Sorry, there are no more questions available. Please create new
        questions for this section.
      </Alert>
    );

  return (
    <div className="space-y-5">
      {questionIds.map((id) => (
        <QuestionItem
          key={id}
          data={questionMap?.get(id)!}
          onAdd={onAddToList}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
