"use client";

import { Button, Loader, LoadingOverlay, Text, TextInput } from "@mantine/core";
import {
  ExamDto,
  ExamResultDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";
import { examSectionTime, sections } from "@/constants/data";
import { useEffect, useMemo, useState } from "react";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { AxiosError } from "axios";
import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { modals } from "@mantine/modals";
import { useForm } from "react-hook-form";

export default function PredefinedSATExamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const examId = searchParams.get("exam-id") || "";

  const [examScores, setExamScores] = useState<ExamSectionResultDto[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<{
    examId: string;
  }>({
    defaultValues: {
      examId,
    },
  });

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

  const {
    data: exam,
    isFetching: isFetchingExam,
    refetch,
    error,
  } = useQuery<ExamDto, AxiosError<{ message: string }>>({
    enabled: false,
    queryKey: ["exam", getValues("examId")],
    queryFn: async () => await examService.startExamById(getValues("examId")),
  });

  useEffect(() => {
    if (exam) setCurrentSectionIndex(0);
  }, [exam]);

  const { data: examModule, isFetching } = useQuery({
    enabled:
      currentSectionIndex >= 0 && currentSectionIndex < sectionsOrder.length,
    queryKey: ["exam", sectionsOrder[currentSectionIndex], currentSectionIndex],
    queryFn: async () =>
      await examService.getExamSectionByExamId(
        exam?.id!,
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
    mutationFn: async (data: ExamSectionResultDto[]) =>
      await examService.submitExamResult(data, exam?.id!),
    onSuccess: (data: ExamResultDto) =>
      router.push(`/student/exam/result/${data.id}`),
  });

  useEffect(() => {
    if (currentSectionIndex === sectionsOrder.length)
      submitExamResult(examScores);
  }, [currentSectionIndex]);

  const onExamStart = (data: { examId: string }) => {
    modals.openConfirmModal({
      title: "Start Exam?",
      centered: true,
      size: "lg",
      children: (
        <Text size="md">
          Are you sure you want to start this exam? Once you start the exam you
          can not retake it ever again.
        </Text>
      ),
      labels: { confirm: "Yes, start the exam", cancel: "No, don't start it" },
      confirmProps: { color: "red" },
      onConfirm: () => refetch(),
    });
  };

  const onExamSectionSubmit = (examSection: ExamSectionSubmitDto) => {
    submitExamSection(examSection);
  };

  if (currentSectionIndex === -1)
    return (
      <form
        className="max-w-2xl mx-auto p-8 space-y-8"
        onSubmit={handleSubmit(onExamStart)}
      >
        <LoadingOverlay
          visible={isFetchingExam}
          overlayBlur={2}
          loader={<Loader variant="bars" size={"xl"} />}
        />
        <ExamStartGuide />
        <TextInput
          {...register("examId", { required: "Exam ID is required" })}
          size="lg"
          error={errors?.examId?.message || error?.response?.data.message}
          label="Exam ID"
          placeholder="Enter exam id"
        />
        <Button fullWidth type="submit">
          I understand, start the exam
        </Button>
      </form>
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
