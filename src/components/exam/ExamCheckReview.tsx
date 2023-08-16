import { Button, Divider, Popover, SimpleGrid } from "@mantine/core";

import CheckIcon from "remixicon-react/CheckboxCircleLineIcon";
import CircleIcon from "remixicon-react/FocusFillIcon";
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

      <Popover.Dropdown>
        <div className="space-y-4 p-2">
          <div className="flex gap-2 w-full justify-between">
            <span className="flex gap-1 items-center">
              <CheckIcon className="text-primary" />
              Answered
            </span>
            <span className="flex gap-1 items-center">
              <QuestionIcon />
              Unanswered
            </span>

            <span className="flex gap-1 items-center">
              <CircleIcon className="text-yellow-400" />
              For Review
            </span>
          </div>

          <Divider />

          <SimpleGrid cols={5} spacing="xs">
            {examQuestions.map((question, index) => (
              <Button
                key={question.id}
                leftIcon={
                  question.selectedOption !== undefined ||
                  question.textAnswer ? (
                    <CheckIcon />
                  ) : (
                    <QuestionIcon />
                  )
                }
                color={
                  question.markedForReview
                    ? "yellow"
                    : question.selectedOption !== undefined ||
                      question.textAnswer
                    ? ""
                    : "gray"
                }
                variant={index === currentIndex ? "outline" : "filled"}
                onClick={() => onIndexSelect(index)}
              >
                {index + 1}
              </Button>
            ))}
          </SimpleGrid>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}

export default ExamCheckReview;
