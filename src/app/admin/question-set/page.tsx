"use client";

import { DataTable, DataTableColumn } from "mantine-datatable";
import { difficulties, sections } from "@/constants/data";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { Divider } from "@mantine/core";
import Link from "next/link";
import { QuestionSetDto } from "@/dtos/question-set.dto";
import { questionSetService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

const questionSetTableColumns: DataTableColumn<QuestionSetDto>[] = [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  {
    accessor: "title",
    ellipsis: true,
    width: 350,
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
];

export default function QuestionSetPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["question-sets"],
    queryFn: () => questionSetService.getList(),
  });

  return (
    <div className="min-h-full p-6 space-y-4">
      <Divider
        label={
          <h1 className="text-text-color font-semibold">Create Question Set</h1>
        }
      />

      <div className="flex gap-4 flex-col xl:flex-row">
        <Link href={"/admin/question-set/create/math"}>
          <DashboardCard
            label={"Create Math Question Set"}
            description={
              "Create a new math question set for students to practice."
            }
            image="https://img.icons8.com/clouds/256/000000/calculator.png"
          />
        </Link>

        <Link href={"/admin/question-set/create/reading"}>
          <DashboardCard
            label={"Create Reading Question Set"}
            description={
              "Create a new reading question set for students to practice."
            }
            image="https://img.icons8.com/clouds/256/000000/book-reading.png"
          />
        </Link>

        <Link href={"/admin/question-set/create/writing"}>
          <DashboardCard
            label={"Create Writing Question Set"}
            description={
              "Create a new writing question set for students to practice."
            }
            image="https://img.icons8.com/clouds/256/000000/hand-with-pen.png"
          />
        </Link>
      </div>

      <Divider
        label={<h1 className="text-text-color font-semibold">Question Sets</h1>}
      />

      <DataTable
        height={"60vh"}
        withBorder
        borderRadius="sm"
        highlightOnHover
        loaderVariant="bars"
        loaderSize="xl"
        fetching={isLoading}
        records={data!}
        columns={questionSetTableColumns}
      />
    </div>
  );
}
