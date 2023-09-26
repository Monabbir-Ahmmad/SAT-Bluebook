"use client";

import {
  Button,
  List,
  Paper,
  SimpleGrid,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  RiCheckLine as CheckIcon,
  RiCloseLine as WrongIcon,
} from "react-icons/ri";
import { Difficulties, SectionTypes } from "@/constants/enums";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { difficulties, sections } from "@/constants/data";
import { examService, questionSetService } from "@/lib/client/services";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ExamCreateReqDto } from "@/dtos/exam.dto";
import { QuestionDto } from "@/dtos/question.dto";
import { QuestionSetDto } from "@/dtos/question-set.dto";
import { examCreateValidationSchema } from "@/validators/exam.validator";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const questionSetTableColumns: MRT_ColumnDef<QuestionSetDto>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "section",
    header: "Section",
    Cell: ({ row }) =>
      sections.find((s) => s.value === row.original.section)?.label,
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    Cell: ({ row }) =>
      difficulties.find((d) => d.value === row.original.difficulty)?.label,
  },
  {
    accessorKey: "questions",
    header: "Questions",
    Cell: ({ row }) => row.original.questions.length,
  },
];

const ValidationIcon = ({ valid }: { valid: boolean }) => {
  if (valid) {
    return (
      <ThemeIcon color="green" size={24} radius="xl">
        <CheckIcon size="1rem" />
      </ThemeIcon>
    );
  }

  return (
    <ThemeIcon color="red" size={24} radius="xl">
      <WrongIcon size="1rem" />
    </ThemeIcon>
  );
};

export default function ExamCreatePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    getValues,
    trigger,
    register,
    formState: { errors },
  } = useForm<ExamCreateReqDto>({
    resolver: zodResolver(examCreateValidationSchema),
    defaultValues: {
      [SectionTypes.MATH]: {
        [Difficulties.EASY]: "",
        [Difficulties.BASE]: "",
        [Difficulties.HARD]: "",
      },
      [SectionTypes.READING_WRITING]: {
        [Difficulties.EASY]: "",
        [Difficulties.BASE]: "",
        [Difficulties.HARD]: "",
      },
    },
  });

  const [selectedQuestionSets, setSelectedQuestionSets] = useState<
    QuestionSetDto[]
  >([]);

  const { data: questionSets = [], isFetching } = useQuery({
    queryKey: ["question-sets"],
    queryFn: () => questionSetService.getList(),
  });

  const { mutate: createExamMutation, isLoading } = useMutation({
    mutationFn: examService.createExam,
    onMutate: () => {
      notifications.show({
        id: "create-exam",
        title: "Creating Exam",
        message: "Please wait while we create the exam",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      notifications.update({
        id: "create-exam",
        title: "Exam Created",
        message: "Exam has been created successfully.",
        color: "green",
        icon: <CheckIcon />,
      });

      router.push("/admin/exam");
    },
    onError: (err: any) => {
      notifications.update({
        id: "create-exam",
        title: "Error",
        message: err.response?.data?.message,
        color: "red",
      });
    },
  });

  useEffect(() => {
    trigger([SectionTypes.MATH, SectionTypes.READING_WRITING]);
  }, []);

  const onQuestionSetAdd = (questionSet: QuestionSetDto) => {
    const section = getValues(questionSet.section);
    section[questionSet.difficulty] = questionSet.id;
    setValue(questionSet.section, section, {
      shouldValidate: true,
    });

    const replaceQuestionSet = selectedQuestionSets.find(
      (qs) =>
        qs.section === questionSet.section &&
        qs.difficulty === questionSet.difficulty
    );

    setSelectedQuestionSets((prev) =>
      prev
        .filter(
          (qs) =>
            qs.section !== questionSet.section ||
            qs.difficulty !== questionSet.difficulty
        )
        .concat(questionSet)
    );

    queryClient.setQueryData<QuestionSetDto[]>(["question-sets"], (prev) => {
      const filteredQuestionSet =
        prev?.filter((qs) => qs.id !== questionSet.id) || [];

      return replaceQuestionSet
        ? filteredQuestionSet.concat(replaceQuestionSet)
        : filteredQuestionSet;
    });

    modals.closeAll();
  };

  const onQuestionSetRemove = (questionSet: QuestionSetDto) => {
    const section = getValues(questionSet.section);
    section[questionSet.difficulty] = "";
    setValue(questionSet.section, section, {
      shouldValidate: true,
    });

    setSelectedQuestionSets((prev) =>
      prev.filter((qs) => qs.id !== questionSet.id)
    );

    queryClient.setQueryData<QuestionSetDto[]>(
      ["question-sets"],
      (prev) => prev?.concat(questionSet) || []
    );
  };

  const onAddQuestionSetClick = () => {
    modals.open({
      title: "Select a question set",
      size: "auto",
      children: (
        <MantineReactTable
          columns={questionSetTableColumns}
          data={questionSets}
          state={{
            isLoading: isFetching,
          }}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row }) => (
            <Button
              variant="gradient"
              onClick={() => onQuestionSetAdd(row.original)}
            >
              Add
            </Button>
          )}
        />
      ),
    });
  };

  const onSubmit = (data: ExamCreateReqDto) => createExamMutation(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper radius={0} className="sticky top-14 w-full border-b z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
          <Title order={3}>Compose an exam</Title>

          <SimpleGrid cols={2}>
            <Button
              variant="gradient"
              uppercase
              type="button"
              loading={isFetching}
              onClick={onAddQuestionSetClick}
            >
              Add Question Sets
            </Button>

            <Button
              variant="gradient"
              uppercase
              type="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </SimpleGrid>
        </div>
      </Paper>

      <div className="p-6 space-y-6">
        <TextInput
          {...register("title")}
          size="lg"
          label="Exam Title"
          placeholder="Enter Exam Title"
          error={errors.title?.message}
        />

        <div className="flex gap-8">
          <List spacing="xs" size="sm" center>
            {Object.values(Difficulties).map((difficulty) => (
              <List.Item
                key={`${SectionTypes.MATH}-${difficulty}`}
                icon={
                  <ValidationIcon
                    valid={!errors?.[SectionTypes.MATH]?.[difficulty]}
                  />
                }
              >
                Select a question set for{" "}
                {sections.find((s) => s.value === SectionTypes.MATH)?.label}
                {" - "}
                {difficulties.find((d) => d.value === difficulty)?.label}
              </List.Item>
            ))}
          </List>

          <List spacing="xs" size="sm" center>
            {Object.values(Difficulties).map((difficulty) => (
              <List.Item
                key={`${SectionTypes.READING_WRITING}-${difficulty}`}
                icon={
                  <ValidationIcon
                    valid={
                      !errors?.[SectionTypes.READING_WRITING]?.[difficulty]
                    }
                  />
                }
              >
                Select a question set for{" "}
                {
                  sections.find((s) => s.value === SectionTypes.READING_WRITING)
                    ?.label
                }
                {" - "}
                {difficulties.find((d) => d.value === difficulty)?.label}
              </List.Item>
            ))}
          </List>
        </div>

        <div className="space-y-4">
          <Title order={4}>Selected question sets</Title>

          <MantineReactTable
            columns={questionSetTableColumns}
            data={selectedQuestionSets}
            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <Button
                color="red"
                onClick={() => onQuestionSetRemove(row.original)}
              >
                Remove
              </Button>
            )}
          />
        </div>
      </div>
    </form>
  );
}
