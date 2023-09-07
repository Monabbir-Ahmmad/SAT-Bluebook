import { Badge, Group, Paper } from "@mantine/core";

import { ExamQuestionDto } from "@/dtos/exam.dto";
import React from "react";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { sections } from "@/constants/data";

interface ExamSectionHeaderProps {
  currentSectionIndex: number;
  remainingTime: number;
  questions: ExamQuestionDto[];
  examSections: string[];
}

export default function ExamSectionHeader({
  currentSectionIndex,
  remainingTime,
  questions,
  examSections,
}: ExamSectionHeaderProps) {
  return (
    <Paper className="sticky top-14 w-full border-b z-10">
      <div className="text-text-color font-semibold flex flex-col md:flex-row items-center justify-between gap-4 p-4 relative">
        <h1 className="text-xl">
          Section {currentSectionIndex + 1}:{" "}
          {
            sections.find((s) => s.value === examSections[currentSectionIndex])
              ?.label
          }
        </h1>
        <h1 className="text-xl md:absolute inset-x-0 text-center">
          Time: {secondsToMmSs(remainingTime)}
        </h1>
        <Group noWrap>
          <Badge variant="dot" size="xl">
            {questions.filter((q) => q.selectedOption !== undefined).length}{" "}
            answered
          </Badge>

          <Badge variant="dot" size="xl" color="yellow">
            {questions.filter((q) => q.markedForReview).length} reviews
          </Badge>
        </Group>
      </div>
    </Paper>
  );
}
