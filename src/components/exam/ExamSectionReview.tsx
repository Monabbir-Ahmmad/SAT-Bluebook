import {
  RiCheckboxCircleLine as CheckIcon,
  RiCheckboxBlankCircleFill as CircleIcon,
  RiQuestionLine as QuestionIcon,
} from "react-icons/ri";
import { Button, Divider, Group, SimpleGrid } from "@mantine/core";

import { ExamQuestionDto } from "@/dtos/exam.dto";

type ExamCheckReviewProps = {
  questions?: ExamQuestionDto[];
  onSubmit: () => any;
};

export default function ExamSectionReview({
  questions = [],
  onSubmit,
}: ExamCheckReviewProps) {
  const answered = questions.filter(
    (q) => q.selectedOption !== undefined || q.textAnswer
  ).length;

  const unanswered = questions.length - answered;

  const needReview = questions.filter((q) => q.markedForReview).length;

  return (
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
          Answered ({answered || "0"})
        </Group>
        <Group noWrap spacing="xs">
          <QuestionIcon size={25} className="text-text-color" />
          Unanswered ({unanswered || "0"})
        </Group>

        <Group noWrap spacing="xs">
          <CircleIcon size={25} className="text-yellow-400" />
          Need Review ({needReview || "0"})
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
        {questions.map((question, index) => (
          <Button
            key={question.id}
            leftIcon={
              question.selectedOption !== undefined || question.textAnswer ? (
                <CheckIcon size={25} />
              ) : (
                <QuestionIcon size={25} />
              )
            }
            color={
              question.markedForReview
                ? "yellow"
                : question.selectedOption !== undefined || question.textAnswer
                ? ""
                : "gray"
            }
            variant={"filled"}
          >
            {index + 1}
          </Button>
        ))}
      </SimpleGrid>

      <Button fullWidth onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
