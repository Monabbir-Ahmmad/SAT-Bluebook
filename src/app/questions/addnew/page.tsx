import AddQuestionForm from "@/components/questions/AddQuestionForm";
import React from "react";

export default function page() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl text-center uppercase font-bold">
        Add New Question
      </h1>
      <AddQuestionForm />
    </div>
  );
}
