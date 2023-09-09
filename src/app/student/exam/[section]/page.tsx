"use client";

import { useEffect, useState } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { Loader, LoadingOverlay } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { examSectionTime } from "@/constants/data";
import { ExamQuestionDto, ExamSectionResultDto } from "@/dtos/exam.dto";
import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import ExamSectionFooter from "@/components/exam/ExamSectionFooter";
import ExamSectionHeader from "@/components/exam/ExamSectionHeader";
import ExamSectionReview from "@/components/exam/ExamSectionReview";

interface SectionExamPageProps {
  params: {
    section: SectionTypes;
  };
}

export default function SectionExamPage({
  params: { section },
}: SectionExamPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [questions, setQuestions] = useState<ExamQuestionDto[]>([]);

  const timer = useInterval(() => setRemainingTime((prev) => prev - 1), 1000);

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const { data, isFetching } = useQuery({
    enabled: !!section,
    queryKey: ["exam", section],
    queryFn: async () => await examService.getExamSection(section),
    onSuccess: (data) => {
      setRemainingTime(examSectionTime[section]);
      setQuestions(data.questions);
      timer.start();
    },
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionResultDto) => {},
  });

  const toggleQuestionProperty = (
    question: ExamQuestionDto,
    propertyName: string,
    value: any
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === question.id ? { ...q, [propertyName]: value } : q
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
    toggleQuestionProperty(
      question,
      "markedWrong",
      selected
        ? [...(question.markedWrong || []), markedIndex]
        : (question.markedWrong || []).filter((index) => index !== markedIndex)
    );
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
          questions={questions}
          onSubmit={() => {
            timer.stop();

            setRemainingTime((remainingTime) => {
              submitExamSection({
                id: data?.id!,
                questions: questions,
                timeTaken: examSectionTime[section] - remainingTime,
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

  const handleBackClick = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full relative">
      <LoadingOverlay
        visible={isFetching || !!isMutating}
        overlayBlur={2}
        loader={<Loader variant="bars" size="xl" />}
      />

      <ExamSectionHeader
        currentSectionIndex={0}
        remainingTime={remainingTime}
        questions={questions}
        examSection={section}
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
        onBackClick={handleBackClick}
        onNextClick={handleNextClick}
        onFinishClick={finishSection}
        onIndexSelect={setCurrentQuestionIndex}
        questions={questions}
      />
    </div>
  );
}
