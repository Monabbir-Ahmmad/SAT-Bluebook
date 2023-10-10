"use client";

import { Button, Loader, LoadingOverlay } from "@mantine/core";
import { DEFAULT_EXAM_BREAK_TIME, sections } from "@/constants/data";
import {
  ExamResultDto,
  ExamSectionSubmitDto,
  ExamSectionVerifiedResultDto,
} from "@/dtos/exam.dto";
import { useEffect, useMemo, useState } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";

import ExamBreakSection from "@/components/exam/ExamBreakSection";
import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { useInterval } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function DynamicSATExamPage() {
  const router = useRouter();

  const [examSectionResults, setExamSectionResults] = useState<
    ExamSectionVerifiedResultDto[]
  >([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

  const [remainingBreakTime, setRemainingBreakTime] = useState(0);

  const timer = useInterval(
    () => setRemainingBreakTime((prev) => prev - 1),
    1000
  );

  const sectionsOrder = useMemo(
    () => [
      SectionTypes.MATH,
      SectionTypes.MATH,
      SectionTypes.READING_WRITING,
      SectionTypes.READING_WRITING,
    ],
    []
  );

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const { data: examSection, isFetching } = useQuery({
    enabled:
      currentSectionIndex >= 0 && currentSectionIndex < sectionsOrder.length,
    queryKey: ["exam", sectionsOrder[currentSectionIndex], currentSectionIndex],
    queryFn: async () =>
      await examService.getDynamicExamSection(
        sectionsOrder[currentSectionIndex],
        examSectionResults.length && currentSectionIndex % 2 != 0
          ? examSectionResults[examSectionResults.length - 1].score
          : undefined
      ),
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionVerifiedResultDto) => {
      setExamSectionResults((prev) => [...prev, data]);

      if (currentSectionIndex === sectionsOrder.length - 1)
        setCurrentSectionIndex((prev) => prev + 1);
      else {
        setRemainingBreakTime(DEFAULT_EXAM_BREAK_TIME);
        timer.start();
      }
    },
  });

  const { mutate: submitExamResult } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamResult,
    onSuccess: (data: ExamResultDto) =>
      router.push(`/student/exam/result/${data.id}`),
  });

  useEffect(() => {
    if (currentSectionIndex === sectionsOrder.length)
      submitExamResult(examSectionResults);
  }, [currentSectionIndex]);

  useEffect(() => {
    if (remainingBreakTime <= 0 && timer.active) {
      timer.stop();
      setCurrentSectionIndex((prev) => prev + 1);
    }
  }, [remainingBreakTime]);

  const onExamStart = () => {
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const onExamSectionSubmit = (examSection: ExamSectionSubmitDto) => {
    submitExamSection(examSection);
  };

  if (currentSectionIndex === -1)
    return (
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <ExamStartGuide />
        <Button fullWidth onClick={onExamStart}>
          I understand, start the exam
        </Button>
      </div>
    );

  if (remainingBreakTime > 0)
    return (
      <ExamBreakSection
        remainingBreakTime={remainingBreakTime}
        onEndBreak={() => setRemainingBreakTime(0)}
      />
    );

  return (
    <div>
      <LoadingOverlay
        visible={isFetching || !!isMutating}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      {examSection && (
        <ExamSection
          section={examSection}
          title={`${sections.find(
            (s) => s.value === sectionsOrder[currentSectionIndex]
          )?.label} - Module ${(currentSectionIndex % 2) + 1}`}
          onSectionSubmit={onExamSectionSubmit}
        />
      )}
    </div>
  );
}
