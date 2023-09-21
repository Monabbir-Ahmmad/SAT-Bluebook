"use client";

import { Button, Divider, Modal } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { examService, userManagementService } from "@/lib/client/services";
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { ExamDto } from "@/dtos/exam.dto";
import Link from "next/link";
import { UserDto } from "@/dtos/user.dto";
import { useState } from "react";

const examTableColumns = ({
  onAssign,
}: {
  onAssign?: (data: ExamDto) => any;
}): DataTableColumn<ExamDto>[] => [
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
    accessor: "createdAt",
    title: "Created At",
    textAlignment: "center",
    render: ({ createdAt }) => new Date(createdAt).toLocaleString(),
  },
  {
    accessor: "assignedTo",
    title: "Assigned To",
    textAlignment: "center",
    render: ({ assignedTo }) => assignedTo.length,
  },
  {
    accessor: "attendedBy",
    title: "Attended By",
    textAlignment: "center",
    render: ({ attendedBy }) => attendedBy.length,
  },
  {
    accessor: "actions",
    title: "Actions",
    textAlignment: "center",
    render: (row: ExamDto) =>
      onAssign && (
        <Button onClick={() => onAssign(row)}>Assign To Student</Button>
      ),
  },
];

const userTableColumns: DataTableColumn<UserDto>[] = [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  { accessor: "name" },
  { accessor: "email" },
];

export default function AdminExamPage() {
  const queryClient = useQueryClient();
  const isMutating = useIsMutating({ mutationKey: ["assign-exam"] });

  const [examToAssign, setExamToAssign] = useState<ExamDto>();

  const { data: exams = [], isLoading: isExamsLoading } = useQuery({
    queryKey: ["exams"],
    queryFn: examService.getList,
  });

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userManagementService.getUsers,
  });

  const { mutate: assignExamMutation } = useMutation({
    mutationKey: ["assign-exam"],
    mutationFn: examService.assignExam,
    onSuccess: (data) => {
      setExamToAssign(undefined);
      queryClient.setQueryData<ExamDto[]>(
        ["exams"],
        (prev) => prev?.map((exam) => (exam.id === data.id ? data : exam)) || []
      );
    },
  });

  const onAssignToStudentClick = (data: ExamDto) => setExamToAssign(data);

  const onExamAssign = () =>
    assignExamMutation({
      examId: examToAssign?.id!,
      userIds: examToAssign?.assignedTo.map((user) => user.id) || [],
    });

  return (
    <div className="min-h-full p-6 space-y-4">
      <Modal
        size={"auto"}
        opened={!!examToAssign}
        title="Assign Exam To Students"
        onClose={() => setExamToAssign(undefined)}
      >
        <DataTable
          striped
          height={"50vh"}
          withBorder
          borderRadius="sm"
          highlightOnHover
          loaderVariant="bars"
          loaderSize="xl"
          fetching={isUsersLoading || !!isMutating}
          records={users}
          columns={userTableColumns}
          selectedRecords={examToAssign?.assignedTo}
          onSelectedRecordsChange={(users) =>
            setExamToAssign((prev) => ({
              ...prev!,
              assignedTo: users,
            }))
          }
        />
        <Button
          my={"md"}
          fullWidth
          onClick={onExamAssign}
          loading={!!isMutating}
        >
          Assign to {examToAssign?.assignedTo.length || 0} Students
        </Button>
      </Modal>

      <Divider
        label={<h1 className="text-text-color font-semibold">Create Exams</h1>}
      />

      <Link href={"/admin/exam/create"} className="flex">
        <DashboardCard
          label={"Create New Exam"}
          description={"Create a new exam to assign to students"}
          image="https://img.icons8.com/clouds/256/000000/document.png"
        />
      </Link>

      <Divider
        label={<h1 className="text-text-color font-semibold">Exams</h1>}
      />

      <DataTable
        striped
        height={"60vh"}
        withBorder
        borderRadius="sm"
        highlightOnHover
        loaderVariant="bars"
        loaderSize="xl"
        fetching={isExamsLoading}
        records={exams}
        columns={examTableColumns({
          onAssign: onAssignToStudentClick,
        })}
      />
    </div>
  );
}
