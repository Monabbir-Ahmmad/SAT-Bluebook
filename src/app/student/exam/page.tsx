"use client";

import {
  ExamQuestionDto,
  ExamResultDto,
  ExamSectionDto,
  ExamSectionResultDto,
} from "@/dtos/exam.dto";
import { Loader, LoadingOverlay } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";

import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import ExamSectionFooter from "@/components/exam/ExamSectionFooter";
import ExamSectionHeader from "@/components/exam/ExamSectionHeader";
import ExamSectionReview from "@/components/exam/ExamSectionReview";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { SectionTypes } from "@/constants/enums";
import { examSectionTime } from "@/constants/data";
import { examService } from "@/lib/client/services";
import { modals } from "@mantine/modals";
import { shuffle } from "@/lib/client/utils/common.util";
import { useInterval } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function ExamPage() {
  const router = useRouter();

  const examSections = useMemo(
    () =>
      shuffle([SectionTypes.MATH, SectionTypes.READING, SectionTypes.WRITING]),
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [exams, setExams] = useState<ExamSectionDto[]>([]);
  const [questions, setQuestions] = useState<ExamQuestionDto[]>([]);

  const timer = useInterval(() => setRemainingTime((prev) => prev - 1), 1000);

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const { refetch, isFetching } = useQuery({
    enabled: !!currentSectionIndex,
    queryKey: ["exam", examSections[currentSectionIndex]],
    queryFn: async () =>
      await examService.getExamSection(examSections[currentSectionIndex]),
    onSuccess: (data) => {
      setRemainingTime(examSectionTime[examSections[currentSectionIndex]]);
      setExams((prev) => [...prev, data]);
      setQuestions(data.questions);
      timer.start();
    },
  });

  const { mutate: submitExamResult } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamResult,
    onSuccess: (data: ExamResultDto) =>
      router.push("/student/exam/result/" + data.id),
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionResultDto) => {
      if (currentSectionIndex < examSections.length - 1) {
        setExams((prev) =>
          prev.map((e) => (e.id === data.id ? { ...e, score: data.score } : e))
        );
        setCurrentSectionIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        submitExamResult(
          exams.map(
            (e) =>
              new ExamSectionResultDto(
                e.id,
                e.section,
                e.id === data.id ? data.score : e.score
              )
          )
        );
      }
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
          questions={questions}
          onSubmit={() => {
            timer.stop();
            submitExamSection({
              id: exams[currentSectionIndex].id!,
              questions: questions,
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

  if (exams.length === 0)
    return (
      <div className="max-w-2xl mx-auto p-8">
        <ExamStartGuide
          onStart={async () => {
            await refetch();
            modals.closeAll();
          }}
        />
        <LoadingOverlay
          visible={isFetching}
          overlayBlur={2}
          loader={<Loader variant="bars" size={"xl"} />}
        />
      </div>
    );

  return (
    <div className="w-full h-full relative">
      <LoadingOverlay
        visible={isFetching || !!isMutating}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      <ExamSectionHeader
        currentSectionIndex={currentSectionIndex}
        remainingTime={remainingTime}
        questions={questions}
        examSections={examSections}
      />

      {questions.length > 0 && (
        <ExamQuestionItem
          data={questions[currentQuestionIndex]}
          title={`Question ${currentQuestionIndex + 1}`}
          toggleAnswer={toggleAnswer}
          toggleMarkAsWrong={toggleMarkAsWrong}
          toggleMarkForReview={toggleMarkForReview}
          onTextAnswerChange={onTextAnswerChange}
        />
      )}

      <ExamSectionFooter
        currentQuestionIndex={currentQuestionIndex}
        onBackClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        onNextClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
        onFinishClick={finishSection}
        onIndexSelect={setCurrentQuestionIndex}
        questions={questions}
      />
    </div>
  );
}
