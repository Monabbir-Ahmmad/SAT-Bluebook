"use client";

import { Badge, Button, Divider } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { difficulties, sections } from "@/constants/data";

import { RiAddFill as AddIcon } from "react-icons/ri";
import { QuestionDto } from "@/dtos/question.dto";
import { convertHtmlToPlain } from "@/lib/client/utils/common.util";
import { questionService } from "@/lib/client/services";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const questionTableColumns: DataTableColumn<QuestionDto>[] = [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  {
    accessor: "question",
    ellipsis: true,
    width: 500,
    render: ({ question }) => convertHtmlToPlain(question),
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
    accessor: "tags",
    render: ({ tags }: { tags: string[] }) =>
      tags.map((tag) => (
        <Badge key={tag} m={4}>
          {tag}
        </Badge>
      )),
  },
];

export default function QuestionPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () => questionService.getList(),
  });

  return (
    <div className="min-h-full p-6 space-y-4">
      <Button
        color="blue"
        leftIcon={<AddIcon size={25} />}
        onClick={() => router.push("/admin/question/create")}
      >
        Create New Question
      </Button>

      <Divider
        label={<h1 className="text-text-color font-semibold">Questions</h1>}
      />

      <DataTable
        height={"70vh"}
        withBorder
        borderRadius="sm"
        highlightOnHover
        loaderVariant="bars"
        loaderSize="xl"
        fetching={isLoading}
        records={data!}
        columns={questionTableColumns}
      />
    </div>
  );
}
