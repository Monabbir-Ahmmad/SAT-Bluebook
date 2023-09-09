"use client";

import { examSectionTime, questionSetSize, sections } from "@/constants/data";
import { SectionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import {
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  RingProgress,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ExamResultPageProps {
  params: { examId: string };
}

const ScoreProgressBar = ({
  score,
  totalExamScore,
}: {
  score: number;
  totalExamScore: number;
}) => (
  <RingProgress
    size={250}
    sections={[{ value: (score / totalExamScore) * 100, color: "blue" }]}
    label={
      <div className="text-center">
        <Title order={4}>Score</Title>
        <Title order={2} color="blue">
          {score} / {totalExamScore}
        </Title>
      </div>
    }
  />
);

const TimeTakenProgressBar = ({
  timeTaken,
  totalExamTime,
}: {
  timeTaken: number;
  totalExamTime: number;
}) => (
  <RingProgress
    size={250}
    sections={[{ value: (timeTaken / totalExamTime) * 100, color: "blue" }]}
    label={
      <div className="text-center">
        <Title order={4}>Time Taken</Title>
        <Title order={2} color="blue">
          {secondsToMmSs(timeTaken)} mins
        </Title>
        <Title order={4}>{secondsToMmSs(totalExamTime)} mins</Title>
      </div>
    }
  />
);

export default function ExamResultPage({
  params: { examId },
}: ExamResultPageProps) {
  const { data: examResult, isFetching } = useQuery({
    queryKey: ["exam-result", examId],
    queryFn: async () => await examService.getExamResult(examId),
  });

  const totalScore = examResult?.results?.reduce(
    (acc, curr) => acc + curr.score,
    0
  );

  const totalTimeTaken = examResult?.results?.reduce(
    (acc, curr) => acc + curr.timeTaken,
    0
  );

  const totalExamScore = Object.values(questionSetSize).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const totalExamTime = Object.values(examSectionTime).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="space-y-6 p-6 text-center">
      <LoadingOverlay
        visible={isFetching}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      <Title order={1}>Exam Result</Title>

      {totalScore !== undefined && totalTimeTaken !== undefined && (
        <Paper
          withBorder
          className="w-full p-6 flex flex-col gap-6 items-center justify-center"
        >
          <Title order={2}>Total Result</Title>

          <Group noWrap>
            <ScoreProgressBar
              score={totalScore}
              totalExamScore={totalExamScore}
            />
            <TimeTakenProgressBar
              timeTaken={totalTimeTaken}
              totalExamTime={totalExamTime}
            />
          </Group>
        </Paper>
      )}

      <div className="flex gap-6 flex-col xl:flex-row">
        {examResult?.results.map((result) => (
          <Paper
            withBorder
            key={result.id}
            className="w-full p-6 flex flex-col gap-6 items-center justify-center"
          >
            <Title order={2}>
              {sections.find((s) => result.section === s.value)?.label}
            </Title>
            <Group noWrap>
              <ScoreProgressBar
                score={result.score}
                totalExamScore={questionSetSize[result.section]}
              />
              <TimeTakenProgressBar
                timeTaken={result.timeTaken}
                totalExamTime={examSectionTime[result.section]}
              />
            </Group>
          </Paper>
        ))}
      </div>
    </div>
  );
}
