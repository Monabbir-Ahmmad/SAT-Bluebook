"use client";

import {
  ExamResultDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";
import { Loader, LoadingOverlay } from "@mantine/core";
import { examSectionTime, sections } from "@/constants/data";
import { useEffect, useMemo, useState } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";

import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { useRouter } from "next/navigation";

export default function FullSATExamPage() {
  const router = useRouter();

  const [examScores, setExamScores] = useState<ExamSectionResultDto[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

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

  const { data: examModule, isFetching } = useQuery({
    enabled:
      currentSectionIndex >= 0 && currentSectionIndex < sectionsOrder.length,
    queryKey: ["exam", sectionsOrder[currentSectionIndex], currentSectionIndex],
    queryFn: async () =>
      await examService.getDynamicExamSection(
        sectionsOrder[currentSectionIndex],
        examScores.length && currentSectionIndex % 2 != 0
          ? examScores[examScores.length - 1].score
          : undefined
      ),
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionResultDto) => {
      setExamScores((prev) => [...prev, data]);
      setCurrentSectionIndex((prev) => prev + 1);
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
      submitExamResult(examScores);
  }, [currentSectionIndex]);

  const onExamStart = () => {
    setCurrentSectionIndex((prev) => prev + 1);
  };

  const onExamSectionSubmit = (examSection: ExamSectionSubmitDto) => {
    submitExamSection(examSection);
  };

  if (currentSectionIndex === -1)
    return (
      <div className="max-w-2xl mx-auto p-8">
        <ExamStartGuide onStart={onExamStart} />
      </div>
    );

  return (
    <div>
      <LoadingOverlay
        visible={isFetching || !!isMutating}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      {examModule && (
        <ExamSection
          section={examModule}
          title={`${sections.find(
            (s) => s.value === sectionsOrder[currentSectionIndex]
          )?.label} - Module ${(currentSectionIndex % 2) + 1}`}
          timeLimit={examSectionTime[sectionsOrder[currentSectionIndex]]}
          onSectionSubmit={onExamSectionSubmit}
        />
      )}
    </div>
  );
}
