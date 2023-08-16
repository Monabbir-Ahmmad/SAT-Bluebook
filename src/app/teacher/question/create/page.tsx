"use client";

import QuestionMakerForm from "@/components/questions/QuestionMakerForm";
import { notifications } from "@mantine/notifications";
import { questionService } from "@/lib/client/services";

export default function QuestionCreatePage() {
  const onSubmit = async (data: QuestionDTO) => {
    try {
      const res = await questionService.create(data);

      notifications.show({
        title: "Success",
        message: "Question has been created successfully.",
      });
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: err.response.data.message,
        color: "red",
      });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl text-center uppercase font-bold text-slate-700">
        Create New Question
      </h1>
      <QuestionMakerForm onSubmit={onSubmit} />
    </div>
  );
}
