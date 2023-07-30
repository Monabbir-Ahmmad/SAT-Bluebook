"use client";

import AddQuestionForm from "@/components/questions/AddQuestionForm";

export default function Page() {
  const onSubmit = (data: QuestionDTO) => {
    console.log(data);
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
