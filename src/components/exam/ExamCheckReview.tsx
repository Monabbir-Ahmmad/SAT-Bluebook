import {
  RiArrowUpSLine as ArrowUpIcon,
  RiCheckboxCircleLine as CheckIcon,
  RiCheckboxBlankCircleFill as CircleIcon,
  RiQuestionLine as QuestionIcon,
} from "react-icons/ri";
import { Button, Divider, Group, Popover, SimpleGrid } from "@mantine/core";

import { ExamQuestionResDTO } from "@/dtos/exam.dto";

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
    <Popover position="bottom" withArrow shadow="lg" arrowSize={26}>
      <Popover.Target>
        <Button rightIcon={<ArrowUpIcon size={25} />}>
          Question {currentIndex + 1} of {examQuestions.length}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <div className="space-y-4 p-2">
          <SimpleGrid
            cols={3}
            spacing="xs"
            breakpoints={[
              { maxWidth: "md", cols: 3 },
              { maxWidth: "sm", cols: 2 },
            ]}
          >
            <Group noWrap spacing="xs">
              <CheckIcon size={25} className="text-primary" />
              Answered
            </Group>
            <Group noWrap spacing="xs">
              <QuestionIcon size={25} className="text-text-color" />
              Unanswered
            </Group>

            <Group noWrap spacing="xs">
              <CircleIcon size={25} className="text-yellow-400" />
              Need Review
            </Group>
          </SimpleGrid>

          <Divider />

          <SimpleGrid
            cols={5}
            breakpoints={[
              { maxWidth: "lg", cols: 5 },
              { maxWidth: "md", cols: 4 },
              { maxWidth: "xs", cols: 3 },
            ]}
            spacing="xs"
          >
            {examQuestions.map((question, index) => (
              <Button
                key={question.id}
                leftIcon={
                  question.selectedOption !== undefined ||
                  question.textAnswer ? (
                    <CheckIcon size={25} />
                  ) : (
                    <QuestionIcon size={25} />
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
