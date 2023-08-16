"use client";

import { Button, Paper } from "@mantine/core";

import ExamCheckReview from "@/components/exam/ExamCheckReview";
import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import { questions } from "@/constants/data";
import { useState } from "react";

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examQuestions, setExamQuestions] =
    useState<ExamQuestionResDTO[]>(questions);

  const toggleAnswer = (
    question: ExamQuestionResDTO,
    selectedIndex: number,
    selected: boolean
  ) => {
    if (selected)
      setExamQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id ? { ...q, selectedOption: selectedIndex } : q
        )
      );
    else
      setExamQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id ? { ...q, selectedOption: undefined } : q
        )
      );
  };

  const toggleMarkAsWrong = (
    question: ExamQuestionResDTO,
    markedIndex: number,
    selected: boolean
  ) => {
    if (selected)
      setExamQuestions((prev) =>
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
      setExamQuestions((prev) =>
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

  const onTextAnswerChange = (question: ExamQuestionResDTO, text: string) => {
    setExamQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, textAnswer: text } : q))
    );
  };

  const toggleMarkForReview = (
    question: ExamQuestionResDTO,
    marked: boolean
  ) => {
    setExamQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id ? { ...q, markedForReview: marked } : q
      )
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold uppercase opacity-70">
            Section
          </h1>
          <h3 className="text-xl font-semibold uppercase opacity-70">
            Time Remaining: 00:00
          </h3>
        </div>

        <hr className="border-gray-300" />

        <ExamQuestionItem
          data={examQuestions[currentIndex]}
          title={`Question ${currentIndex + 1} of ${examQuestions.length}`}
          toggleAnswer={toggleAnswer}
          toggleMarkAsWrong={toggleMarkAsWrong}
          toggleMarkForReview={toggleMarkForReview}
          onTextAnswerChange={onTextAnswerChange}
        />
      </div>

      <Paper className="py-4 fixed bottom-0 w-full" withBorder radius={0}>
        <div className="max-w-4xl w-full flex justify-between items-center mx-auto px-4">
          <Button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Back
          </Button>

          <ExamCheckReview
            examQuestions={examQuestions}
            currentIndex={currentIndex}
            onIndexSelect={setCurrentIndex}
          />

          <Button
            disabled={currentIndex === examQuestions.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </Paper>
    </div>
  );
}
