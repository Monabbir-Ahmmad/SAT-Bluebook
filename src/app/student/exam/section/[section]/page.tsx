"use client";

import { Button, Loader, LoadingOverlay } from "@mantine/core";
import {
  ExamResultDto,
  ExamSectionSubmitDto,
  ExamSectionVerifiedResultDto,
} from "@/dtos/exam.dto";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";

import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { sections } from "@/constants/data";
import { useRouter } from "next/navigation";

interface SectionExamPageProps {
  params: {
    section: SectionTypes;
  };
}

export default function SectionExamPage({
  params: { section },
}: SectionExamPageProps) {
  const router = useRouter();

  const isMutating = useIsMutating({
    mutationKey: ["exam-result"],
  });

  const {
    data: examSection,
    isFetching,
    refetch,
  } = useQuery({
    enabled: false,
    queryKey: ["exam", section],
    queryFn: async () => await examService.getExamSection(section),
  });

  const { mutate: submitExamSection } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamSection,
    onSuccess: (data: ExamSectionVerifiedResultDto) => submitExamResult([data]),
  });

  const { mutate: submitExamResult } = useMutation({
    mutationKey: ["exam-result"],
    mutationFn: examService.submitExamResult,
    onSuccess: (data: ExamResultDto) =>
      router.push(`/student/exam/result/${data.id}`),
  });

  const onExamStart = () => {
    refetch();
  };

  const onExamSectionSubmit = (examSection: ExamSectionSubmitDto) => {
    submitExamSection(examSection);
  };

  if (!examSection && !isFetching)
    return (
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <ExamStartGuide />
        <Button fullWidth onClick={onExamStart}>
          I understand, start the exam
        </Button>
      </div>
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
          title={sections.find((s) => s.value === section)?.label}
          onSectionSubmit={onExamSectionSubmit}
        />
      )}
    </div>
  );
}
