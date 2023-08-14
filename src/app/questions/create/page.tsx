"use client";

import AddQuestionForm from "@/components/questions/AddQuestionForm";
import { questionService } from "@/services";

export default function QuestionCreatePage() {
  const onSubmit = async (data: QuestionDTO) => {
    const question = await questionService.create(data);

    alert(`Question ${question.id} created!`);
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl text-center uppercase font-bold">
        Add New Question
      </h1>
      <AddQuestionForm onSubmit={onSubmit} />
    </div>
  );
}
