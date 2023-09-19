import { Button, Group, Paper } from "@mantine/core";

import ExamCheckReview from "./ExamCheckReview";
import { ExamQuestionDto } from "@/dtos/exam.dto";

interface ExamSectionFooterProps {
  currentQuestionIndex: number;
  onBackClick: () => any;
  onNextClick: () => any;
  onFinishClick: () => any;
  onIndexSelect: (index: number) => any;
  questions?: ExamQuestionDto[];
}

export default function ExamSectionFooter({
  currentQuestionIndex,
  onBackClick,
  onNextClick,
  onFinishClick,
  onIndexSelect,
  questions = [],
}: ExamSectionFooterProps) {
  return (
    <Paper className="sticky z-10 bottom-0 w-full" withBorder radius={0}>
      <Group className="max-w-4xl mx-auto p-4" noWrap position="apart">
        <Button disabled={currentQuestionIndex === 0} onClick={onBackClick}>
          Back
        </Button>

        <ExamCheckReview
          examQuestions={questions}
          currentIndex={currentQuestionIndex}
          onIndexSelect={onIndexSelect}
        />

        {currentQuestionIndex < questions.length - 1 && (
          <Button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={onNextClick}
          >
            Next
          </Button>
        )}

        {currentQuestionIndex === questions.length - 1 && (
          <Button color="green" onClick={onFinishClick}>
            Finish
          </Button>
        )}
      </Group>
    </Paper>
  );
}
