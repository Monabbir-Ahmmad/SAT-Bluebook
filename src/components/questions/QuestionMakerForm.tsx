import {
  Button,
  MultiSelect,
  Paper,
  SegmentedControl,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { FormProvider, useForm } from "react-hook-form";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";
import { difficulties, sections } from "@/constants/data";
import { useEffect, useRef } from "react";

import FileDrop from "../common/fileDrop/FileDrop";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import QuestionOptionAdder from "./QuestionOptionAdder";
import { buttonListMini } from "../common/richEditor/buttonList";
import { questionFormValidator } from "@/lib/client/validators/form.validator";
import { useMediaQuery } from "@mantine/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "@/lib/client/utils/common.util";

type AddQuestionFormProps = {
  onSubmit: (data: QuestionCreateReqDto) => void;
};

export default function QuestionMakerForm({ onSubmit }: AddQuestionFormProps) {
  const largeScreen = useMediaQuery("(min-width: 60em)");

  const questionInputRef = useRef<IRichEditor>(null);
  const passageInputRef = useRef<IRichEditor>(null);

  const formMethods = useForm<QuestionCreateReqDto>({
    resolver: zodResolver(questionFormValidator),
    defaultValues: {
      section: SectionTypes.MATH,
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
      questionInputRef.current.onChange = debounce((content) => {
        setValue(
          "question",
          questionInputRef.current?.getCharCount?.() ? content : undefined
        );
      }, 200);
    }
  }, [setValue, questionInputRef]);

  useEffect(() => {
    if (watch("section") === "math") {
      setValue("passage", undefined);
    } else if (passageInputRef.current) {
      passageInputRef.current.onChange = debounce((content) => {
        setValue(
          "passage",
          passageInputRef.current?.getCharCount?.() ? content : undefined
        );
      }, 200);
    }
  }, [passageInputRef, setValue, watch("section")]);

  useEffect(() => {
    if (errors?.passage)
      passageInputRef.current?.noticeOpen?.(errors?.passage?.message!);

    if (errors?.question)
      questionInputRef?.current?.noticeOpen?.(errors?.question?.message!);
  }, [errors?.question, errors?.passage]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper radius={0} className="sticky top-14 w-full border-b z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
            <Title order={2}>Create a new question</Title>

            <Button type="submit" size="md">
              Submit Question
            </Button>
          </div>
        </Paper>
        <div className="p-5 space-y-5 max-w-4xl mx-auto">
          <Paper
            shadow="xs"
            className="p-6 border-primary border-t-4 flex flex-col gap-4"
          >
            <Title order={2}>Question</Title>

            <div>
              <Text fz={"lg"} fw={500} mb={"xs"}>
                Section
              </Text>
              <SegmentedControl
                orientation={largeScreen ? "horizontal" : "vertical"}
                fullWidth
                size="md"
                color="blue"
                data={sections}
                onChange={(value: SectionTypes) => setValue("section", value)}
              />
            </div>

            {watch("section") !== "math" && (
              <div>
                <Text fz={"lg"} fw={500} mb={"xs"}>
                  Passage
                </Text>
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
              <Text fz={"lg"} fw={500} mb={"xs"}>
                Image (optional)
              </Text>
              <FileDrop
                onChange={(blob) => setValue("questionImage", blob)}
                value={watch("questionImage")}
              />
            </div>

            <div>
              <Text fz={"lg"} fw={500} mb={"xs"}>
                Question
              </Text>
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
              <Text fz={"lg"} fw={500} mb={"xs"}>
                Difficulty
              </Text>
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
              label={
                <Text fz={"lg"} fw={500} mb={"xs"}>
                  Tags
                </Text>
              }
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
            <Title order={2}>Answer</Title>
            <QuestionOptionAdder />
          </Paper>
        </div>
      </form>
    </FormProvider>
  );
}
