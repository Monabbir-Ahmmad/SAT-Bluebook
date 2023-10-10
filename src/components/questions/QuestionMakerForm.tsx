import { Button, MultiSelect, Paper, Select, Text, Title } from "@mantine/core";
import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { FormProvider, useForm } from "react-hook-form";
import RichEditor, { IRichEditor } from "../common/richEditor/RichEditor";
import { difficulties, sections } from "@/constants/data";
import { useEffect, useRef } from "react";

import FileDrop from "../common/fileDrop/FileDrop";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import QuestionOptionAdder from "./QuestionOptionAdder";
import { buttonListMini } from "../common/richEditor/buttonList";
import { debounce } from "@/lib/client/utils/common.util";
import { questionCreateValidationSchema } from "@/validators/question.validator";
import { zodResolver } from "@hookform/resolvers/zod";

type AddQuestionFormProps = {
  onSubmit: (data: QuestionCreateReqDto) => void;
};

export default function QuestionMakerForm({ onSubmit }: AddQuestionFormProps) {
  const questionInputRef = useRef<IRichEditor>(null);
  const passageInputRef = useRef<IRichEditor>(null);

  const formMethods = useForm<QuestionCreateReqDto>({
    resolver: zodResolver(questionCreateValidationSchema),
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
    if (watch("section") === SectionTypes.MATH) {
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

        <div className="p-5 space-y-5">
          <Paper className="p-6 border border-l-4 border-l-primary space-y-4">
            <Title order={2} weight={500}>
              Question Details
            </Title>

            <div className="flex gap-4 flex-col lg:flex-row">
              <Select
                className="w-full"
                label={
                  <Text fz={"lg"} fw={500} mb={"xs"}>
                    Section
                  </Text>
                }
                size="lg"
                data={sections}
                value={watch("section")}
                onChange={(value: SectionTypes) => setValue("section", value)}
              />

              <Select
                className="w-full"
                label={
                  <Text fz={"lg"} fw={500} mb={"xs"}>
                    Difficulty
                  </Text>
                }
                size="lg"
                data={difficulties}
                value={watch("difficulty")}
                onChange={(value: Difficulties) =>
                  setValue("difficulty", value)
                }
              />

              <MultiSelect
                className="w-full"
                label={
                  <Text fz={"lg"} fw={500} mb={"xs"}>
                    Tags
                  </Text>
                }
                size="lg"
                placeholder="Create or select multiple tags"
                searchable
                creatable
                data={[]}
                getCreateLabel={(query) => `+ Create ${query}`}
                onChange={(value) => setValue("tags", value)}
                onCreate={(value) => {
                  const tags = getValues("tags") ?? [];
                  setValue("tags", [...tags, value]);
                  return value;
                }}
                error={!!errors?.tags}
              />
            </div>

            {watch("section") !== SectionTypes.MATH && (
              <div>
                <Text fz={"lg"} fw={500} mb={"xs"}>
                  Passage
                </Text>
                <RichEditor
                  ref={passageInputRef}
                  minHeight="200px"
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
                minHeight="150px"
                width="100%"
                resizingBar={false}
                placeholder="Write your question here..."
                buttonList={buttonListMini}
              />
            </div>
          </Paper>

          <Paper className="p-6 border border-l-4 border-l-primary space-y-4">
            <Title order={2} weight={500}>
              Answer Details
            </Title>
            <QuestionOptionAdder />
          </Paper>
        </div>
      </form>
    </FormProvider>
  );
}
