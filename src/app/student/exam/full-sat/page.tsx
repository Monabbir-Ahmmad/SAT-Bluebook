"use client";

import { useRouter } from "next/navigation";
import { shuffle } from "@/lib/client/utils/common.util";

import { SectionTypes } from "@/constants/enums";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { useEffect, useMemo, useState } from "react";
import {
  ExamResultDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";
import ExamSection from "@/components/exam/ExamSection";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { examService } from "@/lib/client/services";
import { examSectionTime, sections } from "@/constants/data";
import { Loader, LoadingOverlay } from "@mantine/core";

export default function FullSATExamPage() {
  const router = useRouter();

  const [examScores, setExamScores] = useState<ExamSectionResultDto[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);

  const sectionsOrder = useMemo(() => shuffle(Object.values(SectionTypes)), []);

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const { data: examModule, isFetching } = useQuery({
    enabled:
      currentSectionIndex >= 0 && currentSectionIndex < sectionsOrder.length,
    queryKey: ["exam", sectionsOrder[currentSectionIndex]],
    queryFn: async () =>
      await examService.getExamSection(
        sectionsOrder[currentSectionIndex],
        examScores.length ? examScores[examScores.length - 1].score : undefined
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
          title={
            sections.find((s) => s.value === sectionsOrder[currentSectionIndex])
              ?.label
          }
          timeLimit={examSectionTime[sectionsOrder[currentSectionIndex]]}
          onSectionSubmit={onExamSectionSubmit}
        />
      )}
    </div>
  );
}
