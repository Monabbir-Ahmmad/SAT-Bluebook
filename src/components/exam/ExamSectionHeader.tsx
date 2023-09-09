import { Badge, Group, Paper } from "@mantine/core";

import { ExamQuestionDto } from "@/dtos/exam.dto";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { sections } from "@/constants/data";
import { RiAlarmLine as TimerIcon } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { SectionTypes } from "@/constants/enums";

interface ExamSectionHeaderProps {
  currentSectionIndex: number;
  remainingTime: number;
  questions: ExamQuestionDto[];
  examSection: SectionTypes;
}

export default function ExamSectionHeader({
  currentSectionIndex,
  remainingTime,
  questions = [],
  examSection,
}: ExamSectionHeaderProps) {
  return (
    <Paper className="sticky top-14 w-full border-b z-10">
      <div className="text-text-color font-semibold flex flex-col md:flex-row items-center justify-between gap-4 p-4 relative">
        <h1 className="text-xl uppercase">
          Section {currentSectionIndex + 1}:{" "}
          {sections.find((s) => s.value === examSection)?.label}
        </h1>
        <div
          className={twMerge(
            "text-xl md:absolute inset-x-0 flex items-center justify-center gap-2",
            remainingTime < 60 && "text-red-500"
          )}
        >
          <TimerIcon size={30} />
          <span>{secondsToMmSs(remainingTime)}</span>
        </div>
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
