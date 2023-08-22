import {
  Button,
  MultiSelect,
  Paper,
  SegmentedControl,
  Select,
} from "@mantine/core";
import { Difficulties, OptionTypes, SubjectTypes } from "@/constants/enums";
import { FormProvider, useForm } from "react-hook-form";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";
import { difficulties, subjects } from "@/constants/data";
import { useEffect, useRef } from "react";

import FileDrop from "../common/fileDrop/FileDrop";
import { QuestionCreateReqDTO } from "@/dtos/question.dto";
import QuestionOptionAdder from "./QuestionOptionAdder";
import { buttonListMini } from "../common/richEditor/buttonList";
import { questionFormValidator } from "@/lib/client/validators/form.validator";
import { useMediaQuery } from "@mantine/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

type AddQuestionFormProps = {
  onSubmit: (data: QuestionCreateReqDTO) => void;
};

export default function QuestionMakerForm({ onSubmit }: AddQuestionFormProps) {
  const largeScreen = useMediaQuery("(min-width: 60em)");

  const questionInputRef = useRef<IRichEditor>(null);
  const passageInputRef = useRef<IRichEditor>(null);

  const formMethods = useForm<QuestionCreateReqDTO>({
    resolver: zodResolver(questionFormValidator),
    defaultValues: {
      subject: SubjectTypes.MATH,
      difficulty: Difficulties.EASY,
      optionType: OptionTypes.MCQ_TEXT,
      answers: [],
      options: [{}],
      tags: [],
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
  } = formMethods;

  useEffect(() => {
    if (questionInputRef.current) {
      questionInputRef.current.onChange = (content) => {
        setValue("question", content);
      };
    }
  }, [setValue, questionInputRef]);

  useEffect(() => {
    if (watch("subject") === "math") {
      setValue("passage", undefined);
    } else if (passageInputRef.current) {
      passageInputRef.current.onChange = (content) => {
        setValue("passage", content);
      };
    }
  }, [passageInputRef, setValue, watch("subject")]);

  useEffect(() => {
    if (errors?.question)
      questionInputRef?.current?.noticeOpen?.(errors?.question?.message!);

    if (errors?.passage)
      passageInputRef.current?.noticeOpen?.(errors?.passage?.message!);
  }, [errors?.question, errors?.passage]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex items-center justify-center">
        <form
          className="flex-1 flex flex-col gap-4 max-w-4xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Paper
            shadow="xs"
            className="p-6 border-primary border-t-4 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold">Question</h2>

            <div>
              <h6 className="font-semibold mb-2.5">Section</h6>
              <SegmentedControl
                orientation={largeScreen ? "horizontal" : "vertical"}
                fullWidth
                size="md"
                color="blue"
                data={subjects}
                onChange={(value: SubjectTypes) => setValue("subject", value)}
              />
            </div>

            {watch("subject") !== "math" && (
              <div>
                <h6 className="font-semibold mb-2.5">Passage</h6>
                <RichEditor
                  ref={passageInputRef}
                  minHeight="100px"
                  width="100%"
                  resizingBar={false}
                  placeholder="Write your passage here..."
                  buttonList={buttonListMini}
                />
              </div>
            )}

            <div>
              <h6 className="font-semibold mb-2.5">Image (optional)</h6>
              <FileDrop
                onChange={(blob) => setValue("questionImage", blob)}
                value={watch("questionImage")}
              />
            </div>

            <div>
              <h6 className="font-semibold mb-2.5">Question</h6>
              <RichEditor
                ref={questionInputRef}
                minHeight="100px"
                width="100%"
                resizingBar={false}
                placeholder="Write your question here..."
                buttonList={buttonListMini}
              />
            </div>

            <div>
              <h6 className="font-semibold mb-2.5">Difficulty</h6>
              <SegmentedControl
                orientation={largeScreen ? "horizontal" : "vertical"}
                fullWidth
                size="md"
                color="blue"
                data={difficulties}
                onChange={(value: Difficulties) =>
                  setValue("difficulty", value)
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
              onChange={(value) => setValue("tags", value)}
              onCreate={(value) => {
                setValue("tags", [...getValues().tags, value]);
                return value;
              }}
              error={!!errors?.tags}
            />
          </Paper>

          <Paper
            shadow="xs"
            className="p-6 border-primary border-l-4 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold">Answer</h2>
            <QuestionOptionAdder />
          </Paper>

          <Button type="submit" size="lg">
            Submit Question
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
