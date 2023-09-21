"use client";

import { Badge, Group, Paper } from "@mantine/core";
import {
  ExamQuestionDto,
  ExamSectionDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";
import { useEffect, useState } from "react";

import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import ExamSectionFooter from "@/components/exam/ExamSectionFooter";
import ExamSectionReview from "@/components/exam/ExamSectionReview";
import { RiAlarmLine as TimerIcon } from "react-icons/ri";
import { modals } from "@mantine/modals";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { twMerge } from "tailwind-merge";
import { useInterval } from "@mantine/hooks";

export interface ExamSectionProps {
  section: ExamSectionDto;
  title?: string;
  timeLimit: number;
  onSectionSubmit: (examSection: ExamSectionSubmitDto) => any;
}

export default function ExamSection({
  section,
  title,
  timeLimit,
  onSectionSubmit,
}: ExamSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [examSection, setExamSection] = useState<ExamSectionDto>();

  const timer = useInterval(() => setRemainingTime((prev) => prev - 1), 1000);

  useEffect(() => {
    if (section) {
      setCurrentQuestionIndex(0);
      setExamSection(section);
      setRemainingTime(timeLimit);
      timer.start();
    }
  }, [section]);

  const toggleQuestionProperty = (
    question: ExamQuestionDto,
    propertyName: string,
    value: any
  ) => {
    const updatedQuestions = examSection?.questions.map((q) =>
      q.id === question.id ? { ...q, [propertyName]: value } : q
    );

    setExamSection(
      (prev) =>
        prev && {
          ...prev,
          questions: updatedQuestions || [],
        }
    );
  };

  const toggleAnswer = (
    question: ExamQuestionDto,
    selectedIndex: number,
    selected: boolean
  ) => {
    toggleQuestionProperty(
      question,
      "selectedOption",
      selected ? selectedIndex : undefined
    );
  };

  const toggleMarkAsWrong = (
    question: ExamQuestionDto,
    markedIndex: number,
    selected: boolean
  ) => {
    const markedIndices = question.markedWrong || [];
    const updatedMarkedIndices = selected
      ? [...markedIndices, markedIndex]
      : markedIndices.filter((index) => index !== markedIndex);

    toggleQuestionProperty(question, "markedWrong", updatedMarkedIndices);
  };

  const onTextAnswerChange = (question: ExamQuestionDto, text: string) => {
    toggleQuestionProperty(question, "textAnswer", text);
  };

  const toggleMarkForReview = (question: ExamQuestionDto, marked: boolean) => {
    toggleQuestionProperty(question, "markedForReview", marked);
  };

  const finishSection = async () => {
    modals.closeAll();

    modals.open({
      size: "lg",
      centered: true,
      title: remainingTime ? "Section Review" : "Time's up!",
      classNames: {
        title: "text-2xl font-semibold",
      },
      closeOnClickOutside: !!remainingTime,
      closeOnEscape: !!remainingTime,
      closeButtonProps: { display: !!remainingTime ? "flex" : "none" },
      children: (
        <ExamSectionReview
          questions={examSection?.questions}
          onSubmit={() => {
            timer.stop();
            if (examSection)
              setRemainingTime((remainingTime) => {
                onSectionSubmit({
                  id: examSection?.id,
                  questions: examSection?.questions,
                  timeTaken: timeLimit - remainingTime,
                });
                return remainingTime;
              });

            modals.closeAll();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (remainingTime <= 0 && timer.active) {
      timer.stop();
      finishSection();
    }
  }, [remainingTime]);

  return (
    <div className="w-full h-full relative">
      <Paper className="sticky top-14 w-full border-b z-10">
        <div className="text-text-color font-semibold flex flex-col md:flex-row items-center justify-between gap-4 p-4 relative">
          <h1 className="text-xl uppercase">{title}</h1>
          <div
            className={twMerge(
              "text-xl md:absolute inset-x-0 flex items-center justify-center gap-2",
              remainingTime < 60 && "text-red-500"
            )}
          >
            <TimerIcon size={30} />
            <span>{secondsToMmSs(remainingTime)}</span>
          </div>
          <Group noWrap>
            <Badge variant="dot" size="xl">
              {
                examSection?.questions.filter(
                  (q) => q.selectedOption !== undefined
                ).length
              }{" "}
              answered
            </Badge>

            <Badge variant="dot" size="xl" color="yellow">
              {examSection?.questions.filter((q) => q.markedForReview).length}{" "}
              reviews
            </Badge>
          </Group>
        </div>
      </Paper>

      <div className="min-h-[calc(100vh-195px)]">
        {!!examSection?.questions?.length && (
          <ExamQuestionItem
            data={examSection?.questions[currentQuestionIndex]}
            title={`Question ${currentQuestionIndex + 1}`}
            toggleAnswer={toggleAnswer}
            toggleMarkAsWrong={toggleMarkAsWrong}
            toggleMarkForReview={toggleMarkForReview}
            onTextAnswerChange={onTextAnswerChange}
          />
        )}
      </div>

      <ExamSectionFooter
        currentQuestionIndex={currentQuestionIndex}
        onBackClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        onNextClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
        onFinishClick={finishSection}
        onIndexSelect={setCurrentQuestionIndex}
        questions={examSection?.questions}
      />
    </div>
  );
}
