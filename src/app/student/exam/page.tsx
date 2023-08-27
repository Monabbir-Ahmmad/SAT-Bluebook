"use client";

import { Badge, Button, Group, Paper } from "@mantine/core";
import { ExamDto, ExamQuestionDto } from "@/dtos/exam.dto";

import ExamCheckReview from "@/components/exam/ExamCheckReview";
import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import { examService } from "@/lib/client/services";
import useQuery from "@/hooks/useQuery";
import { useState } from "react";

export default function ExamPage() {
  const [questions, setQuestions] = useState<ExamQuestionDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useQuery<ExamDto>({
    requestFn: examService.get,
    auto: true,
    onSuccess: (data) => {
      setQuestions(data.questions);
    },
  });

  const toggleAnswer = (
    question: ExamQuestionDto,
    selectedIndex: number,
    selected: boolean
  ) => {
    if (selected)
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id ? { ...q, selectedOption: selectedIndex } : q
        )
      );
    else
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id ? { ...q, selectedOption: undefined } : q
        )
      );
  };

  const toggleMarkAsWrong = (
    question: ExamQuestionDto,
    markedIndex: number,
    selected: boolean
  ) => {
    if (selected)
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? {
                ...q,
                markedWrong: q.markedWrong
                  ? [...q.markedWrong, markedIndex]
                  : [markedIndex],
              }
            : q
        )
      );
    else
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? {
                ...q,
                markedWrong: q.markedWrong?.filter(
                  (index) => index !== markedIndex
                ),
              }
            : q
        )
      );
  };

  const onTextAnswerChange = (question: ExamQuestionDto, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, textAnswer: text } : q))
    );
  };

  const toggleMarkForReview = (question: ExamQuestionDto, marked: boolean) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id ? { ...q, markedForReview: marked } : q
      )
    );
  };

  return (
    <div className="w-full h-full">
      <Paper className="sticky top-14 w-full border-b z-10">
        <div className="text-text-color font-semibold flex flex-col md:flex-row items-center justify-between gap-4 p-4 relative">
          <h1 className="text-xl">Section</h1>
          <h1 className="text-xl md:absolute inset-x-0 text-center">
            Time: 00:00
          </h1>
          <Group noWrap>
            <Badge variant="dot" size="xl">
              {questions.filter((q) => q.selectedOption !== undefined).length}{" "}
              answered
            </Badge>

            <Badge variant="dot" size="xl" color="yellow">
              {questions.filter((q) => q.markedForReview).length} reviews
            </Badge>
          </Group>
        </div>
      </Paper>

      {questions.length > 0 && (
        <ExamQuestionItem
          data={questions[currentIndex]}
          title={`Question ${currentIndex + 1}`}
          toggleAnswer={toggleAnswer}
          toggleMarkAsWrong={toggleMarkAsWrong}
          toggleMarkForReview={toggleMarkForReview}
          onTextAnswerChange={onTextAnswerChange}
        />
      )}

      <Paper className="sticky z-10 bottom-0 w-full" withBorder radius={0}>
        <Group className="max-w-4xl mx-auto p-4" noWrap position="apart">
          <Button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Back
          </Button>

          <ExamCheckReview
            examQuestions={questions}
            currentIndex={currentIndex}
            onIndexSelect={setCurrentIndex}
          />

          <Button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next
          </Button>
        </Group>
      </Paper>
    </div>
  );
}
