"use client";

import { examSectionTime, questionSetSize, sections } from "@/constants/data";
import { examService } from "@/lib/client/services";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import {
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  RingProgress,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ExamResultPageProps {
  params: { examId: string };
}

const ScoreProgressBar = ({
  score,
  totalScore,
}: {
  score: number;
  totalScore: number;
}) => (
  <RingProgress
    size={250}
    sections={[{ value: (score / totalScore) * 100, color: "blue" }]}
    label={
      <div className="text-center">
        <Title order={4}>Score</Title>
        <Title order={2} color="blue">
          {score} / {totalScore}
        </Title>
      </div>
    }
  />
);

const TimeTakenProgressBar = ({
  timeTaken,
  totalTime,
}: {
  timeTaken: number;
  totalTime: number;
}) => (
  <RingProgress
    size={250}
    sections={[{ value: (timeTaken / totalTime) * 100, color: "blue" }]}
    label={
      <div className="text-center">
        <Title order={4}>Time Taken</Title>
        <Title order={2} color="blue">
          {secondsToMmSs(timeTaken)} mins
        </Title>
        <Title order={4}>{secondsToMmSs(totalTime)} mins</Title>
      </div>
    }
  />
);

export default function ExamResultPage({
  params: { examId },
}: ExamResultPageProps) {
  const [totalResult, setTotalResult] = useState({
    score: 0,
    timeTaken: 0,
    examScore: 0,
    examTime: 0,
  });

  const { data: examResult, isFetching } = useQuery({
    queryKey: ["exam-result", examId],
    queryFn: async () => await examService.getExamResult(examId),
  });

  useEffect(() => {
    if (examResult) {
      const score = examResult?.results?.reduce(
        (acc, curr) => acc + curr.score,
        0
      );

      const timeTaken = examResult?.results?.reduce(
        (acc, curr) => acc + curr.timeTaken,
        0
      );

      const examScore = examResult?.results?.reduce(
        (acc, curr) => acc + questionSetSize[curr.section],
        0
      );

      const examTime = examResult?.results?.reduce(
        (acc, curr) => acc + examSectionTime[curr.section],
        0
      );

      setTotalResult({
        score,
        timeTaken,
        examScore,
        examTime,
      });
    }
  }, [examResult]);

  return (
    <div className="space-y-6 p-6 text-center">
      <LoadingOverlay
        visible={isFetching}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      <Title order={1}>Exam Result</Title>

      {totalResult.examScore > 0 && (
        <Paper
          withBorder
          className="w-full p-6 flex flex-col gap-6 items-center justify-center"
        >
          <Title order={2}>Total Result</Title>

          <Group noWrap>
            <ScoreProgressBar
              score={totalResult.score}
              totalScore={totalResult.examScore}
            />
            <TimeTakenProgressBar
              timeTaken={totalResult.timeTaken}
              totalTime={totalResult.examTime}
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
                totalScore={questionSetSize[result.section]}
              />
              <TimeTakenProgressBar
                timeTaken={result.timeTaken}
                totalTime={examSectionTime[result.section]}
              />
            </Group>
          </Paper>
        ))}
      </div>
    </div>
  );
}
