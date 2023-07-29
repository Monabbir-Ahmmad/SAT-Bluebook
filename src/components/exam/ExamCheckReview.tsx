import { Button, Popover } from "@mantine/core";

import CheckIcon from "remixicon-react/CheckboxCircleLineIcon";
import QuestionIcon from "remixicon-react/QuestionLineIcon";

type ExamCheckReviewProps = {
  examQuestions: ExamQuestionResDTO[];
  currentIndex: number;
  onIndexSelect: (index: number) => void;
};

function ExamCheckReview({
  examQuestions,
  currentIndex,
  onIndexSelect,
}: ExamCheckReviewProps) {
  return (
    <Popover position="bottom" withArrow shadow="lg" arrowSize={16}>
      <Popover.Target>
        <Button>Review Answers</Button>
      </Popover.Target>

      <Popover.Dropdown className="flex flex-wrap gap-2 items-center justify-center max-w-xs">
        {examQuestions.map((question, index) => (
          <Button
            key={question.id}
            leftIcon={
              question.selectedOption !== undefined || question.textAnswer ? (
                <CheckIcon />
              ) : (
                <QuestionIcon />
              )
            }
            color={
              question.markedForReview
                ? "yellow"
                : question.selectedOption !== undefined || question.textAnswer
                ? ""
                : "gray"
            }
            variant={index === currentIndex ? "outline" : "filled"}
            onClick={() => onIndexSelect(index)}
          >
            {index + 1}
          </Button>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
}

export default ExamCheckReview;
