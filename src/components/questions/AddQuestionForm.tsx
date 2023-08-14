import { Button, MultiSelect, SegmentedControl, Select } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";
import { difficulties, subjects } from "@/constants/data";
import { useEffect, useRef } from "react";

import AddQuestionOptions from "./AddQuestionOptions";
import FileDrop from "../common/fileDrop/FileDrop";
import { buttonListMini } from "../common/richEditor/buttonList";
import { questionFormValidator } from "@/lib/client/utils/validators/formValidators";
import { useMediaQuery } from "@mantine/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

type AddQuestionFormProps = {
  onSubmit: (data: QuestionDTO) => void;
};

export default function AddQuestionForm({ onSubmit }: AddQuestionFormProps) {
  const largeScreen = useMediaQuery("(min-width: 60em)");

  const richEditorRef = useRef<IRichEditor>(null);

  const formMethods = useForm<QuestionDTO>({
    resolver: zodResolver(questionFormValidator),
    defaultValues: {
      difficulty: 0,
      optionType: "mcq-text",
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

  console.log(formMethods.formState.errors);

  return (
    <FormProvider {...formMethods}>
      <div className="flex items-center justify-center">
        <form
          className="flex-1 flex flex-col gap-4 max-w-4xl"
          onSubmit={formMethods.handleSubmit(onSubmit)}
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
              labelProps={{ className: "text-lg mb-2.5 text-text-color" }}
              placeholder="Pick a subject"
              data={subjects}
              onChange={(value) => formMethods.setValue("subject", value!)}
              error={!!formMethods.formState.errors?.subject}
            />

            <div>
              <h6 className="font-semibold mb-2.5">Difficulty</h6>
              <SegmentedControl
                orientation={largeScreen ? "horizontal" : "vertical"}
                fullWidth
                size="md"
                color="blue"
                data={difficulties}
                onChange={(value: string) =>
                  formMethods.setValue("difficulty", parseInt(value))
                }
              />
            </div>

            <MultiSelect
              size="md"
              label="Tags"
              labelProps={{ className: "text-lg mb-2.5 text-text-color" }}
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
            <h2 className="text-2xl font-semibold">Answer</h2>
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
