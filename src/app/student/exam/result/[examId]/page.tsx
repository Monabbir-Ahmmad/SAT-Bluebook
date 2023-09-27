"use client";

import {
  Loader,
  LoadingOverlay,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { examSectionTime, questionSetSize, sections } from "@/constants/data";
import { useEffect, useState } from "react";

import { examService } from "@/lib/client/services";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { useQuery } from "@tanstack/react-query";

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
    size={200}
    thickness={6}
    sections={[{ value: (score / totalScore) * 100, color: "blue" }]}
    label={
      <div className="text-center font-semibold">
        <Text>Score</Text>
        <Title order={3} color="blue">
          {score} / {totalScore}
        </Title>
      </div>
    }
  />
);

const TimeTakenProgressBar = ({
  timeTaken,
  timeLimit,
}: {
  timeTaken: number;
  timeLimit: number;
}) => (
  <RingProgress
    size={200}
    thickness={6}
    sections={[{ value: (timeTaken / timeLimit) * 100, color: "blue" }]}
    label={
      <div className="text-center font-semibold">
        <Text>Time Taken</Text>
        <Title order={3} color="blue">
          {secondsToMmSs(timeTaken)} mins
        </Title>
        <Text>{secondsToMmSs(timeLimit)} mins</Text>
      </div>
    }
  />
);

const ResultCard = ({
  score,
  timeTaken,
  timeLimit,
  totalScore,
  title,
}: {
  score: number;
  timeTaken: number;
  timeLimit: number;
  totalScore: number;
  title: string;
}) => (
  <Paper
    withBorder
    className="w-full p-6 flex flex-col gap-4 items-center justify-center"
  >
    <Title order={3}>{title}</Title>
    <div className="flex flex-col md:flex-row">
      <ScoreProgressBar score={score} totalScore={totalScore} />
      <TimeTakenProgressBar timeTaken={timeTaken} timeLimit={timeLimit} />
    </div>
  </Paper>
);

export default function ExamResultPage({
  params: { examId },
}: ExamResultPageProps) {
  const [totalResult, setTotalResult] = useState({
    score: 0,
    timeTaken: 0,
    examScore: 0,
    examTimeLimit: 0,
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

      const examTimeLimit = examResult?.results?.reduce(
        (acc, curr) => acc + examSectionTime[curr.section],
        0
      );

      setTotalResult({
        score,
        timeTaken,
        examScore,
        examTimeLimit,
      });
    }
  }, [examResult]);

  return (
    <div className="space-y-6 p-6 text-center max-w-6xl mx-auto">
      <LoadingOverlay
        visible={isFetching}
        overlayBlur={2}
        loader={<Loader variant="bars" size={"xl"} />}
      />

      <Title order={1}>Exam Result</Title>

      {examResult && (
        <>
          <Title order={3} weight={600}>
            Completed At - {new Date(examResult?.createdAt).toLocaleString()}
          </Title>

          {totalResult.examScore > 0 && (
            <ResultCard
              score={totalResult.score}
              timeTaken={totalResult.timeTaken}
              timeLimit={totalResult.examTimeLimit}
              totalScore={totalResult.examScore}
              title="Total Result"
            />
          )}

          <SimpleGrid
            cols={examResult?.results.length > 1 ? 2 : 1}
            spacing={"lg"}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            {examResult?.results.map((result, index) => (
              <ResultCard
                key={result.questionSetId}
                score={result.score}
                timeTaken={result.timeTaken}
                timeLimit={examSectionTime[result.section]}
                totalScore={questionSetSize[result.section]}
                title={`Exam ${index + 1} - ${sections.find(
                  (s) => result.section === s.value
                )?.label}`}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </div>
  );
}
