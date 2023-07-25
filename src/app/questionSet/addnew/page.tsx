"use client";

import QuestionItem from "@/components/questionSet/QuestionItem";
import { questions } from "@/constants/data";
import { useState } from "react";

export default function page() {
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionDTO[]>([]);
  const [availableQuestions, setAvailableQuestions] =
    useState<QuestionDTO[]>(questions);

  const onQuestionSelect = (question: QuestionDTO) => {
    setAvailableQuestions((prev) => prev.filter((q) => q !== question));
    setSelectedQuestions((prev) => [...prev, question]);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl text-center uppercase font-semibold">
        Create New Question Set
      </h1>

      <hr className="border-2 border-slate-300" />

      <div className="flex divide-x-2">
        <div className="flex flex-col gap-4 flex-1 p-5">
          <h1 className="text-2xl font-semibold text-center">
            Selected Questions
          </h1>

          {selectedQuestions.map((question) => (
            <QuestionItem
              key={question.question}
              question={question}
              onAddToSet={onQuestionSelect}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 flex-1 p-5">
          <h1 className="text-2xl font-semibold text-center">
            Available Questions
          </h1>
          {availableQuestions.map((question) => (
            <QuestionItem
              key={question.question}
              question={question}
              onAddToSet={onQuestionSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
