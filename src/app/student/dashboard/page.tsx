"use client";

import { Divider, Paper } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";

import DashboardOptions from "@/components/dashboard/DashboardOptions";
import { GiGraduateCap as EducationIcon } from "react-icons/gi";
import { ExamResultDto } from "@/dtos/exam.dto";
import Image from "next/image";
import { examService } from "@/lib/client/services";
import { secondsToMmSs } from "@/lib/client/utils/common.util";
import { studentDashboardOptions } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const examResultTableColumns: MRT_ColumnDef<ExamResultDto>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 250,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    accessorFn: ({ results }) => results?.reduce((a, b) => a + b.score, 0),
    header: "Total Score",
  },
  {
    accessorFn: ({ results }) =>
      secondsToMmSs(results?.reduce((a, b) => a + b.timeTaken, 0)) + " mins",
    header: "Total Time Taken",
  },
];

export default function StudentDashboardPage() {
  const session = useSession();

  const { data: examResults = [], isFetching } = useQuery({
    queryKey: ["exam-results"],
    queryFn: examService.getExamResults,
  });

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6 p-6">
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

      <div className="space-y-4">
        <Divider
          label={<h1 className="text-2xl text-text-color">Take Exams</h1>}
          labelPosition="left"
        />

        <DashboardOptions options={studentDashboardOptions} />
      </div>

      <div className="space-y-4">
        <Divider
          label={
            <h1 className="text-2xl text-text-color">Your Previous Exams</h1>
          }
          labelPosition="left"
        />

        <MantineReactTable
          columns={examResultTableColumns}
          data={examResults}
          state={{ isLoading: isFetching }}
        />
      </div>
    </div>
  );
}
