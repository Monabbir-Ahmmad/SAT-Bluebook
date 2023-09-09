"use client";

import { useRouter } from "next/navigation";
import { shuffle } from "@/lib/client/utils/common.util";

import { SectionTypes } from "@/constants/enums";
import ExamSection from "@/components/exam/ExamSection";
import ExamStartGuide from "@/components/exam/ExamStartGuide";
import { useState } from "react";
import { ExamResultDto } from "@/dtos/exam.dto";

export default function ExamPage() {
  const router = useRouter();

  const [examSections, setExamSections] = useState<SectionTypes[]>([]);

  const onExamStart = () => {
    setExamSections(shuffle(Object.values(SectionTypes)));
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
