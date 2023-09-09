"use client";

import { useState, useEffect } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { Loader, LoadingOverlay } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { examService } from "@/lib/client/services";
import { examSectionTime } from "@/constants/data";
import { ExamQuestionDto, ExamSectionDto } from "@/dtos/exam.dto";
import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import ExamSectionFooter from "@/components/exam/ExamSectionFooter";
import ExamSectionHeader from "@/components/exam/ExamSectionHeader";
import ExamSectionReview from "@/components/exam/ExamSectionReview";
import { ExamResultDto, ExamSectionResultDto } from "@/dtos/exam.dto";
import { SectionTypes } from "@/constants/enums";

export interface ExamSectionProps {
  sectionsOrder: SectionTypes[];
  onExamFinish: (examResult: ExamResultDto) => any;
}

export default function ExamSection({
  sectionsOrder = Object.values(SectionTypes),
  onExamFinish,
}: ExamSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [exams, setExams] = useState<ExamSectionDto[]>([]);

  const timer = useInterval(() => setRemainingTime((prev) => prev - 1), 1000);

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const { isFetching } = useQuery({
    queryKey: ["exam", sectionsOrder[currentSectionIndex]],
    queryFn: async () =>
      await examService.getExamSection(
        sectionsOrder[currentSectionIndex],
        exams.length ? exams[exams.length - 1].score : undefined
      ),
    onSuccess: (data) => {
      setRemainingTime(examSectionTime[sectionsOrder[currentSectionIndex]]);
      setExams((prev) => [...prev, data]);
      timer.start();
    },
  });

  const { mutate: submitExamResult } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamResult,
    onSuccess: (data: ExamResultDto) => onExamFinish(data),
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionResultDto) => {
      if (currentSectionIndex < sectionsOrder.length - 1) {
        setExams((prev) =>
          prev.map((e) =>
            e.id === data.id
              ? { ...e, score: data.score, timeTaken: data.timeTaken }
              : e
          )
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
                e.id === data.id ? data.score : e.score,
                e.id === data.id ? data.timeTaken : e.timeTaken!
              )
          )
        );
      }
    },
  });

  const toggleQuestionProperty = (
    question: ExamQuestionDto,
    propertyName: string,
    value: any
  ) => {
    const currentExam = exams[currentSectionIndex];
    const updatedQuestions = currentExam.questions.map((q) =>
      q.id === question.id ? { ...q, [propertyName]: value } : q
    );
    setExams((prevExams) =>
      prevExams.map((exam, index) =>
        index === currentSectionIndex
          ? { ...exam, questions: updatedQuestions }
          : exam
      )
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
          questions={exams[currentSectionIndex].questions}
          onSubmit={() => {
            timer.stop();

            setRemainingTime((remainingTime) => {
              submitExamSection({
                id: exams[currentSectionIndex].id!,
                questions: exams[currentSectionIndex].questions,
                timeTaken:
                  examSectionTime[sectionsOrder[currentSectionIndex]] -
                  remainingTime,
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
      <LoadingOverlay
        visible={isFetching || !!isMutating}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      <ExamSectionHeader
        currentSectionIndex={currentSectionIndex}
        examSection={sectionsOrder[currentSectionIndex]}
        remainingTime={remainingTime}
        questions={exams[currentSectionIndex]?.questions}
      />

      <div className="min-h-[calc(100vh-195px)]">
        {exams[currentSectionIndex]?.questions.length > 0 && (
          <ExamQuestionItem
            data={exams[currentSectionIndex]?.questions[currentQuestionIndex]}
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
        questions={exams[currentSectionIndex]?.questions}
      />
    </div>
  );
}
