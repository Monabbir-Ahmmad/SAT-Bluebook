"use client";

import { Badge, Divider } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { difficulties, sections } from "@/constants/data";

import DashboardCard from "@/components/dashboard/DashboardCard";
import Link from "next/link";
import { QuestionDto } from "@/dtos/question.dto";
import { convertHtmlToPlain } from "@/lib/client/utils/common.util";
import { questionService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

const questionTableColumns: MRT_ColumnDef<QuestionDto>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "question",
    header: "Question",
    Cell: ({ row }) => convertHtmlToPlain(row.original.question),
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
    accessorKey: "tags",
    header: "Tags",
    Cell: ({ row }) =>
      row.original.tags?.map((tag) => (
        <Badge key={tag} m={4}>
          {tag}
        </Badge>
      )),
  },
];

export default function QuestionPage() {
  const { data: questions = [], isFetching } = useQuery({
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

      <MantineReactTable
        columns={questionTableColumns}
        data={questions}
        state={{ isLoading: isFetching }}
      />
    </div>
  );
}
