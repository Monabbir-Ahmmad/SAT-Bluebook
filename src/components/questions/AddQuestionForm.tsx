"use client";

import { Button, MultiSelect, SegmentedControl, Select } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";
import { useEffect, useRef } from "react";

import AddQuestionOptions from "./AddQuestionOptions";
import FileDrop from "../common/fileDrop/FileDrop";
import { buttonListMini } from "../common/richEditor/buttonList";
import { questionFormValidator } from "@/constants/validators/formValidators";
import { zodResolver } from "@hookform/resolvers/zod";

const subjects = [
  { value: "math", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
];

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function AddQuestionForm() {
  const richEditorRef = useRef<IRichEditor>(null);
  const formMethods = useForm<QuestionDTO>({
    resolver: zodResolver(questionFormValidator),
    defaultValues: {
      difficulty: "easy",
      optionType: "text",
      answers: [],
      options: [{}],
      tags: [],
    },
  });

  useEffect(() => {
    if (richEditorRef.current) {
      richEditorRef.current.onChange = (content) => {
        formMethods.setValue("question", content);
      };
    }
  }, [formMethods, richEditorRef]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex items-center justify-center">
        <form
          className="flex-1 flex flex-col gap-4 max-w-4xl"
          onSubmit={formMethods.handleSubmit((data) => console.log(data))}
        >
          <div className="p-6 shadow border-primary border-t-4 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Question</h2>

            <div>
              <h6 className="font-semibold mb-2.5">Text</h6>
              <RichEditor
                ref={richEditorRef}
                minHeight="100px"
                width="100%"
                resizingBar={false}
                placeholder="Write your question here..."
                buttonList={buttonListMini}
              />
            </div>

            <div>
              <h6 className="font-semibold mb-2.5">Image (optional)</h6>
              <FileDrop
                onChange={(blob) => formMethods.setValue("questionImage", blob)}
                value={formMethods.watch("questionImage")}
              />
            </div>

            <Select
              size="md"
              label="Subject"
              labelProps={{ className: "text-lg mb-2.5" }}
              placeholder="Pick a subject"
              data={subjects}
              onChange={(value) => formMethods.setValue("subject", value!)}
              error={!!formMethods.formState.errors?.subject}
            />

            <div>
              <h6 className="font-semibold mb-2.5">Difficulty</h6>
              <SegmentedControl
                fullWidth
                size="md"
                color="blue"
                data={difficulties}
                onChange={(value: "easy" | "medium" | "hard") =>
                  formMethods.setValue("difficulty", value)
                }
              />
            </div>

            <MultiSelect
              size="md"
              label="Tags"
              labelProps={{ className: "text-lg mb-2.5" }}
              data={[]}
              placeholder="Create or select multiple tags"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onChange={(value) => formMethods.setValue("tags", value)}
              onCreate={(value) => {
                formMethods.setValue("tags", [
                  ...formMethods.getValues().tags,
                  value,
                ]);
                return value;
              }}
              error={!!formMethods.formState.errors?.tags}
            />
          </div>

          <div className="p-6 shadow border-primary border-l-4 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Answer Options</h2>
            <AddQuestionOptions />
          </div>

          <Button type="submit" size="lg">
            Submit Question
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
