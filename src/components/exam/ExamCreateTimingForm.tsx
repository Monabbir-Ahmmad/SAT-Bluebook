import { Difficulties, SectionTypes } from "@/constants/enums";
import { NumberInput, Paper, SimpleGrid, Title } from "@mantine/core";

interface ExamCreateTimingFormProps {
  onTimeLimitChange: (
    section: SectionTypes,
    difficulty: Difficulties,
    time?: number
  ) => any;

  onBreakTimeChange: (
    section: SectionTypes,
    difficulty: Difficulties,
    time?: number
  ) => any;
}

export default function ExamCreateTimingForm({
  onTimeLimitChange,
  onBreakTimeChange,
}: ExamCreateTimingFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Title order={4}>Math question set timings</Title>
        <Paper p="lg" withBorder>
          <SimpleGrid cols={2} spacing="lg">
            <NumberInput
              label="Base Time Limit (in minutes)"
              description="If you want default time limit, leave this blank"
              min={1}
              onChange={(timeInMin) =>
                onTimeLimitChange(
                  SectionTypes.MATH,
                  Difficulties.BASE,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Base Break Time (in minutes)"
              description="If you don't want break time, leave this blank"
              min={0}
              onChange={(timeInMin) =>
                onBreakTimeChange(
                  SectionTypes.MATH,
                  Difficulties.BASE,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Easy/Hard Time Limit (in minutes)"
              description="If you want default time limit, leave this blank"
              min={1}
              onChange={(timeInMin) =>
                onTimeLimitChange(
                  SectionTypes.MATH,
                  Difficulties.EASY,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Easy/Hard Break Time (in minutes)"
              description="If you don't want break time, leave this blank"
              min={0}
              onChange={(timeInMin) =>
                onBreakTimeChange(
                  SectionTypes.MATH,
                  Difficulties.EASY,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
          </SimpleGrid>
        </Paper>
      </div>

      <div className="space-y-4">
        <Title order={4}>Reading & Writing question set timings</Title>
        <Paper p="lg" withBorder>
          <SimpleGrid cols={2} spacing="lg">
            <NumberInput
              label="Base Time Limit (in minutes)"
              description="If you want default time limit, leave this blank"
              min={1}
              onChange={(timeInMin) =>
                onTimeLimitChange(
                  SectionTypes.READING_WRITING,
                  Difficulties.BASE,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Base Break Time (in minutes)"
              description="If you don't want break time, leave this blank"
              min={0}
              onChange={(timeInMin) =>
                onBreakTimeChange(
                  SectionTypes.READING_WRITING,
                  Difficulties.BASE,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Easy/Hard Time Limit (in minutes)"
              description="If you want default time limit, leave this blank"
              min={1}
              onChange={(timeInMin) =>
                onTimeLimitChange(
                  SectionTypes.READING_WRITING,
                  Difficulties.EASY,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
            <NumberInput
              label="Easy/Hard Break Time (in minutes)"
              description="If you don't want break time, leave this blank"
              min={0}
              onChange={(timeInMin) =>
                onBreakTimeChange(
                  SectionTypes.READING_WRITING,
                  Difficulties.EASY,
                  timeInMin === "" ? undefined : timeInMin * 60
                )
              }
            />
          </SimpleGrid>
        </Paper>
      </div>
    </div>
  );
}
