"use client";

import { useRouter } from "next/navigation";

import { SectionTypes } from "@/constants/enums";
import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { useState } from "react";
import { ExamResultDto } from "@/dtos/exam.dto";

interface SectionExamPageProps {
  params: {
    section: SectionTypes;
  };
}

export default function SectionExamPage({
  params: { section },
}: SectionExamPageProps) {
  const router = useRouter();

  const [examSections, setExamSections] = useState<SectionTypes[]>([]);

  const onExamStart = () => {
    setExamSections([section]);
  };

  const onExamFinish = (examResult: ExamResultDto) => {
    router.push(`/student/exam/result/${examResult.id}`);
  };

  if (examSections.length === 0)
    return (
      <div className="max-w-2xl mx-auto p-8">
        <ExamStartGuide onStart={onExamStart} />
      </div>
    );

  return (
    <ExamSection sectionsOrder={examSections} onExamFinish={onExamFinish} />
  );
}
