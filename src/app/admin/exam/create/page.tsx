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
import { DataTable, DataTableColumn } from "mantine-datatable";
import { Difficulties, SectionTypes } from "@/constants/enums";
import { difficulties, sections } from "@/constants/data";
import { examService, questionSetService } from "@/lib/client/services";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ExamCreateReqDto } from "@/dtos/exam.dto";
import { QuestionSetDto } from "@/dtos/question-set.dto";
import { examCreateFormValidator } from "@/lib/client/validators/form.validator";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const questionSetTableColumns = ({
  onAdd,
  onRemove,
}: {
  onAdd?: (questionSet: QuestionSetDto) => void;
  onRemove?: (questionSet: QuestionSetDto) => void;
}): DataTableColumn<QuestionSetDto>[] => [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  {
    accessor: "title",
    ellipsis: true,
    width: 300,
  },
  {
    accessor: "section",
    render: ({ section }) => sections.find((s) => s.value === section)?.label,
  },
  {
    accessor: "difficulty",
    render: ({ difficulty }) =>
      difficulties.find((d) => d.value === difficulty)?.label,
  },
  {
    accessor: "questions",
    textAlignment: "center",
    render: ({ questions }) => questions.length,
  },
  {
    accessor: "actions",
    title: "Actions",
    textAlignment: "center",
    render: (row: QuestionSetDto) => (
      <div className="flex gap-2 justify-center">
        {onAdd && <Button onClick={() => onAdd(row)}>Add</Button>}
        {onRemove && (
          <Button color="red" onClick={() => onRemove(row)}>
            Remove
          </Button>
        )}
      </div>
    ),
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

  const {
    handleSubmit,
    setValue,
    getValues,
    trigger,
    register,
    formState: { errors },
  } = useForm<ExamCreateReqDto>({
    resolver: zodResolver(examCreateFormValidator),
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

  const { data: questionSets, isFetching } = useQuery({
    queryKey: ["question-sets"],
    queryFn: () => questionSetService.getList(),
  });

  const { mutate: createExamMutation } = useMutation({
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
        <DataTable
          striped
          height={"70vh"}
          withBorder
          borderRadius="sm"
          highlightOnHover
          loaderVariant="bars"
          loaderSize="xl"
          records={questionSets || []}
          columns={questionSetTableColumns({
            onAdd: onQuestionSetAdd,
          })}
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

            <Button variant="gradient" uppercase type="submit">
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

          <DataTable
            striped
            height={"50vh"}
            withBorder
            borderRadius="sm"
            highlightOnHover
            loaderVariant="bars"
            loaderSize="xl"
            records={selectedQuestionSets}
            columns={questionSetTableColumns({
              onRemove: onQuestionSetRemove,
            })}
          />
        </div>
      </div>
    </form>
  );
}
