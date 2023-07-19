"use client";

import { FormProvider, useForm } from "react-hook-form";

import AddQuestionOptions from "./AddQuestionOptions";
import RichEditor from "../common/richEditor/RichEditor";
import Select from "../common/input/Select";
import { buttonListMini } from "../common/richEditor/buttonList";
import { useState } from "react";

type AnswerType = "text" | "multiple-choice";

export default function AddQuestionForm() {
  const [answerType, setAnswerType] = useState<AnswerType>("text");

  const formMethods = useForm<{ options: { text: string }[] }>();

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col gap-4">
        <div className="card p-6 bg-base-100 shadow-xl border-primary border-t-8">
          <h2 className="text-2xl">Add Question</h2>
          <p className="text-base-content text-opacity-80">
            Add a new question to the database.
          </p>
        </div>

        <form
          className="card p-6 bg-base-100 shadow-xl border-primary border-l-4 flex flex-col gap-6"
          onSubmit={formMethods.handleSubmit((data) => console.log(data))}
        >
          <div>
            <label className="block font-semibold text-base mb-2">
              Question
            </label>
            <RichEditor
              className="input border-2 focus:input-primary"
              mode="balloon-always"
              minHeight="50px"
              width="100%"
              resizingBar={false}
              placeholder="Write your question here..."
              buttonList={buttonListMini}
            />
          </div>

          <Select
            label="Answer Type"
            labelCss="text-base"
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value as AnswerType)}
            options={[
              { value: "text", label: "Text answer" },
              { value: "multiple-choice", label: "Multiple Choice" },
            ]}
          />

          {answerType === "multiple-choice" && <AddQuestionOptions />}

          {answerType === "text" && (
            <div>
              <label className="block font-semibold text-base mb-2">
                Answer
              </label>
              <RichEditor
                className="input border-2 focus:input-primary"
                mode="balloon-always"
                minHeight="50px"
                width="100%"
                resizingBar={false}
                placeholder="Write the answer here..."
                buttonList={buttonListMini}
              />
            </div>
          )}

          <button className="btn btn-primary">Submit</button>
        </form>

        <ul className="flex items-center justify-center flex-col bg-gray-200">
          <li>Question</li>
          <li>Ans</li>
          <li>Options</li>
          <li>Tags</li>
          <li>Subject</li>
        </ul>
      </div>
    </FormProvider>
  );
}
