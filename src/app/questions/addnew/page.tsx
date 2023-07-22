import AddQuestionForm from "@/components/questions/AddQuestionForm";
import React from "react";

export default function page() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl text-center">Add New Question</h1>
      <AddQuestionForm />
    </div>
  );
}
