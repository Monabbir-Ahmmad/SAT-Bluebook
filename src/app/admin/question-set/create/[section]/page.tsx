"use client";

import {
  Alert,
  Badge,
  Button,
  Drawer,
  Modal,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  RiErrorWarningLine as AlertIcon,
  RiCheckLine as CheckIcon,
} from "react-icons/ri";
import { Difficulties, SectionTypes } from "@/constants/enums";
import { difficulties, questionSetSize, sections } from "@/constants/data";
import { questionService, questionSetService } from "@/lib/client/services";
import { useMutation, useQuery } from "@tanstack/react-query";

import AvailableQuestions from "@/components/question-set/AvailableQuestions";
import { QuestionDto } from "@/dtos/question.dto";
import QuestionItem from "@/components/question-set/QuestionItem";
import { QuestionSetCreateReqDto } from "@/dtos/question-set.dto";
import { notifications } from "@mantine/notifications";
import { questionSetCreateValidationSchema } from "@/validators/question-set.validator";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface PageProps {
  params: {
    section: SectionTypes;
  };
}

export default function QuestionSetCreatePage({
  params: { section },
}: PageProps) {
  const sectionLimit = questionSetSize[section];

  const router = useRouter();
  const [openedModal, modal] = useDisclosure(false);
  const [openedDrawer, drawer] = useDisclosure(false);
  const [questionMap, setQuestionMap] = useState<Map<string, QuestionDto>>();
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([]);

  const formMethods = useForm<QuestionSetCreateReqDto>({
    defaultValues: {
      title: "",
      difficulty: Difficulties.EASY,
      section: section,
      questions: [],
    },
    resolver: zodResolver(questionSetCreateValidationSchema),
  });

  useQuery({
    enabled: !!section,
    queryKey: ["questions", section],
    queryFn: () => questionService.getList(section),
    onSuccess: (data: QuestionDto[]) => {
      setQuestionMap(new Map(data.map((q) => [q.id, q])));
      setAvailableQuestions(data.map((q) => q.id));
    },
  });

  const { mutate: createQuestionSet } = useMutation({
    mutationFn: questionSetService.create,
    onMutate: () => {
      notifications.show({
        id: "create-question-set",
        title: "Creating Question Set",
        message: "Please wait while we create your question set.",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: () => {
      notifications.update({
        id: "create-question-set",
        title: "Question Set Created",
        message: "Question set has been created successfully.",
        color: "green",
        icon: <CheckIcon />,
      });

      router.push("/admin/question-set");
    },
    onError: (err: any) => {
      notifications.update({
        id: "create-question-set",
        title: "Error",
        message: err.response?.data?.message,
        color: "red",
      });
    },
  });

  const onSubmit = (data: QuestionSetCreateReqDto) => {
    modal.close();
    createQuestionSet(data);
  };

  const onAddToList = (questionId: string) => {
    formMethods.setValue("questions", [
      ...formMethods.getValues("questions"),
      questionId,
    ]);
    setAvailableQuestions((prev) => prev.filter((id) => id !== questionId));
  };

  const onRemoveFromList = (questionId: string) => {
    formMethods.setValue(
      "questions",
      formMethods.getValues("questions").filter((id) => id !== questionId)
    );

    setAvailableQuestions((prev) => [...prev, questionId]);
  };

  return (
    <div>
      <Drawer
        opened={openedDrawer}
        onClose={drawer.close}
        position="right"
        size={"xl"}
        transitionProps={{
          duration: 0,
        }}
        title={
          <p className="text-text-color text-lg font-semibold">
            Available <span className="text-primary">{section}</span> questions
          </p>
        }
      >
        <AvailableQuestions
          questionIds={availableQuestions}
          questionMap={questionMap!}
          onAddToList={onAddToList}
          disabled={formMethods.watch("questions").length >= sectionLimit}
        />
      </Drawer>

      <Modal
        size={"lg"}
        opened={openedModal}
        onClose={modal.close}
        title={`Create question set for ${section} section`}
        centered
      >
        <form
          className="space-y-8"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <TextInput
            {...formMethods.register("title")}
            size="md"
            label="Title"
            placeholder="Enter Question Set Title"
            error={formMethods.formState.errors.title?.message}
          />

          <div>
            <Text size={"sm"} weight={600} className="mt-4">
              Difficulty
            </Text>
            <SegmentedControl
              fullWidth
              size="md"
              color="blue"
              data={difficulties}
              onChange={(value: Difficulties) =>
                formMethods.setValue("difficulty", value)
              }
            />
          </div>

          <Button fullWidth variant="gradient" uppercase type="submit">
            Submit
          </Button>
        </form>
      </Modal>

      <Paper radius={0} className="sticky top-14 w-full border-b z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
          <Title order={3}>
            Compose a <span className="text-primary">{section}</span> question
            set
          </Title>

          <Badge variant="dot" size="xl">
            {formMethods.watch("questions").length} of {sectionLimit} questions
            selected
          </Badge>

          <SimpleGrid cols={2}>
            <Button variant="gradient" uppercase onClick={drawer.open}>
              Add Questions
            </Button>

            <Button
              variant="gradient"
              uppercase
              onClick={modal.open}
              disabled={formMethods.watch("questions").length !== sectionLimit}
            >
              Proceed
            </Button>
          </SimpleGrid>
        </div>
      </Paper>

      <div className="max-w-3xl space-y-5 mx-auto p-6">
        {!formMethods.watch("questions").length && (
          <Alert icon={<AlertIcon />} title="No Questions Selected!">
            Please select questions to create a {section} question set.
          </Alert>
        )}

        {formMethods.watch("questions").map((id) => (
          <QuestionItem
            key={id}
            data={questionMap?.get(id)!}
            selected
            onRemove={onRemoveFromList}
          />
        ))}
      </div>
    </div>
  );
}
