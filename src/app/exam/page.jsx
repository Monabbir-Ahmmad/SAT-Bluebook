"use client";

import ExamQuestionItem from "@/components/exam/ExamQuestionItem";
import { questions } from "@/constants/data";

function page() {
  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold">Section</h1>
      <div className="max-w-4xl w-full flex flex-col gap-4">
        {questions.map((question, index) => (
          <ExamQuestionItem key={question.id} data={question} index={index} />
        ))}
      </div>
    </div>
  );
}

export default page;
