import { Button, Text, Title } from "@mantine/core";

import { RiAlarmLine as TimerIcon } from "react-icons/ri";
import { modals } from "@mantine/modals";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

interface ExamBreakSectionProps {
  remainingBreakTime: number;
  onEndBreak: () => any;
}

export default function ExamBreakSection({
  remainingBreakTime,
  onEndBreak,
}: ExamBreakSectionProps) {
  const onEndBreakClick = () => {
    modals.openConfirmModal({
      modalId: "end-break",
      title: "End the break?",
      centered: true,
      size: "lg",
      children: (
        <Text size="md">
          Are you sure you want to end the break time and continue the exam?
        </Text>
      ),
      labels: {
        confirm: "Yes, end the break",
        cancel: "No, don't end the break",
      },
      confirmProps: { color: "red" },
      onConfirm: () => onEndBreak(),
    });
  };

  useEffect(() => {
    return () => {
      modals.close("end-break");
    };
  }, []);

  return (
    <div className="h-full text-2xl flex flex-col items-center justify-center gap-6">
      <Title order={1}>Take a break!</Title>

      <div
        className={twMerge(
          "flex items-center justify-center gap-2",
          remainingBreakTime < 60 && "text-red-500"
        )}
      >
        <TimerIcon size={50} />
        <Title order={1}>{secondsToMmSs(remainingBreakTime)}</Title>
      </div>

      <object
        data={"/exam-break.svg"}
        type="image/svg+xml"
        className="h-[45vh]"
      />

      <Button
        size="lg"
        radius={"xl"}
        variant="gradient"
        w={300}
        onClick={onEndBreakClick}
      >
        End The Break
      </Button>
    </div>
  );
}
