"use client";

import { Loader, LoadingOverlay, SimpleGrid, Title } from "@mantine/core";
import { QUESTION_SET_SIZE, sections } from "@/constants/data";
import { useEffect, useState } from "react";

import ExamResultCard from "@/components/exam-result/ExamResultCard";
import { examService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

interface ExamResultPageProps {
  params: { examId: string };
}

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
      const score = examResult?.sectionResults?.reduce(
        (acc, curr) => acc + curr.score,
        0
      );

      const timeTaken = examResult?.sectionResults?.reduce(
        (acc, curr) => acc + curr.timeTaken,
        0
      );

      const examScore = examResult?.sectionResults?.reduce(
        (acc, curr) => acc + QUESTION_SET_SIZE[curr.section],
        0
      );

      const examTimeLimit = examResult?.sectionResults?.reduce(
        (acc, curr) => acc + curr.timeLimit,
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
            <ExamResultCard
              score={totalResult.score}
              timeTaken={totalResult.timeTaken}
              timeLimit={totalResult.examTimeLimit}
              totalScore={totalResult.examScore}
              title="Total Result"
            />
          )}

          <SimpleGrid
            cols={examResult?.sectionResults.length > 1 ? 2 : 1}
            spacing={"lg"}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            {examResult?.sectionResults.map((result, index) => (
              <ExamResultCard
                key={result.id}
                score={result.score}
                timeTaken={result.timeTaken}
                timeLimit={result.timeLimit}
                totalScore={result.questions.length}
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
