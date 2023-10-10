import { Paper, RingProgress, Text, Title } from "@mantine/core";

import { secondsToMmSs } from "@/lib/client/utils/common.util";

interface ScoreProgressBarProps {
  score: number;
  totalScore: number;
}

interface TimeTakenProgressBarProps {
  timeTaken: number;
  timeLimit: number;
}

interface ExamResultCardProps {
  score: number;
  timeTaken: number;
  timeLimit: number;
  totalScore: number;
  title: string;
}

const ScoreProgressBar = ({ score, totalScore }: ScoreProgressBarProps) => (
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
}: TimeTakenProgressBarProps) => (
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

export default function ExamResultCard({
  score,
  timeTaken,
  timeLimit,
  totalScore,
  title,
}: ExamResultCardProps) {
  return (
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
}
