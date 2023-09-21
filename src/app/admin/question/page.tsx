"use client";

import { Badge, Divider } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { difficulties, sections } from "@/constants/data";

import DashboardCard from "@/components/dashboard/DashboardCard";
import Link from "next/link";
import { QuestionDto } from "@/dtos/question.dto";
import { convertHtmlToPlain } from "@/lib/client/utils/common.util";
import { questionService } from "@/lib/client/services";
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
  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => await questionService.getList(),
  });

  return (
    <div className="min-h-full p-6 space-y-4">
      <Link href={"/admin/question/create"} className="flex">
        <DashboardCard
          label={"Create New Question"}
          description={"Create a new question to add to a question sets."}
          image="https://img.icons8.com/clouds/256/000000/question-mark.png"
        />
      </Link>

      <Divider
        label={<h1 className="text-text-color font-semibold">Questions</h1>}
      />

      <DataTable
        striped
        height={"65vh"}
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
