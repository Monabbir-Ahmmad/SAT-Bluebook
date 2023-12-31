"use client";

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import QuestionMakerForm from "@/components/questions/QuestionMakerForm";
import QuestionPreview from "@/components/questions/QuestionPreview";
import { ScrollArea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { questionService } from "@/lib/client/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function QuestionCreatePage() {
  const router = useRouter();

  const { mutate: createQuestion } = useMutation({
    mutationFn: questionService.create,
    onMutate: () => {
      notifications.show({
        id: "create-question",
        title: "Creating Question",
        message: "Please wait while we create your question.",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    },
    onError: (err: any) => {
      notifications.update({
        id: "create-question",
        title: "Error",
        message: err.response?.data?.message,
        color: "red",
      });
    },
    onSuccess: () => {
      notifications.update({
        id: "create-question",
        title: "Question Created",
        message: "Your question has been created successfully.",
        color: "green",
        icon: <CheckIcon />,
      });

      router.push("/admin/question");
    },
  });

  const onSubmit = async (data: QuestionCreateReqDto) => {
    modals.openConfirmModal({
      title: "Question Preview",
      size: "xl",
      centered: true,
      children: (
        <ScrollArea.Autosize mah={"70vh"}>
          <QuestionPreview
            data={{
              id: "1",
              ...data,
            }}
          />
        </ScrollArea.Autosize>
      ),
      labels: {
        confirm: "Create this question",
        cancel: "Cancel",
      },
      onConfirm: () => createQuestion(data),
    });
  };

  return (
    <div>
      <QuestionMakerForm onSubmit={onSubmit} />
    </div>
  );
}
