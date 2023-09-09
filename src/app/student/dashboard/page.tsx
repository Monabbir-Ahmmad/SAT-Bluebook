"use client";

import { Divider, Paper } from "@mantine/core";

import { GiGraduateCap as EducationIcon } from "react-icons/gi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { examService } from "@/lib/client/services";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { ExamResultDto } from "@/dtos/exam.dto";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import DashboardOptions from "@/components/dashboard/DashboardOptions";
import { studentDashboardOptions } from "@/constants/data";

const examResultTableColumns: DataTableColumn<ExamResultDto>[] = [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  {
    accessor: "createdAt",
    title: "Date",
    textAlignment: "center",
  },
  {
    accessor: "results",
    title: "Total Score",
    textAlignment: "center",
    render: ({ results }) => results.reduce((a, b) => a + b.score, 0),
  },
  {
    accessor: "results",
    title: "Total Time Taken",
    textAlignment: "center",
    render: ({ results }) =>
      secondsToMmSs(results.reduce((a, b) => a + b.timeTaken, 0)) + " mins",
  },
];

export default function StudentDashboardPage() {
  const session = useSession();

  const { data: examResults, isLoading } = useQuery({
    queryKey: ["exam-results"],
    queryFn: examService.getExamResults,
  });

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-5 p-4">
      <EducationIcon size={64} className="text-primary" />

      <h1 className="font-bold text-primary">Student Dashboard</h1>

      <Paper className="w-full p-6 gap-5 flex relative border border-l-8 border-l-primary">
        <h1 className="w-9/12 text-text-color">
          Welcome{" "}
          <span className="text-primary font-bold">
            {session?.data?.user?.name}!
          </span>{" "}
          You are logged in as a student.
        </h1>

        <Image
          src={"/study.svg"}
          alt="study"
          width={300}
          height={300}
          className="absolute -bottom-11 right-0"
        />
      </Paper>

      <Divider
        label={<h1 className="text-2xl text-text-color">Take Exams</h1>}
        labelPosition="left"
      />

      <DashboardOptions options={studentDashboardOptions} />

      <Divider
        label={
          <h1 className="text-2xl text-text-color">Your Previous Exams</h1>
        }
        labelPosition="left"
      />

      <DataTable
        verticalSpacing={"md"}
        height={"80vh"}
        withBorder
        borderRadius="sm"
        highlightOnHover
        loaderVariant="bars"
        loaderSize="xl"
        fetching={isLoading}
        records={examResults!}
        columns={examResultTableColumns}
      />
    </div>
  );
}
