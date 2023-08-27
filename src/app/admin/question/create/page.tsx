"use client";

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import QuestionMakerForm from "@/components/questions/QuestionMakerForm";
import { notifications } from "@mantine/notifications";
import { questionService } from "@/lib/client/services";
import useQuery from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

export default function QuestionCreatePage() {
  const router = useRouter();

  const { request: createQuestion } = useQuery({
    requestFn: questionService.create,
    onRequest: () => {
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
    createQuestion(data);
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl text-center uppercase font-bold text-text-color">
        Create New Question
      </h1>
      <QuestionMakerForm onSubmit={onSubmit} />
    </div>
  );
}
