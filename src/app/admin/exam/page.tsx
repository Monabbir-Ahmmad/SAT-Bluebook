"use client";

import { Button, Divider, Modal } from "@mantine/core";
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MantineReactTable,
} from "mantine-react-table";
import { examService, userManagementService } from "@/lib/client/services";
import { useEffect, useState } from "react";
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

const examTableColumns: MRT_ColumnDef<ExamDto>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    Cell: ({ row }) => row.original.assignedTo.length,
  },
  {
    accessorKey: "attendedBy",
    header: "Attended By",
    Cell: ({ row }) => row.original.attendedBy.length,
  },
];

const userTableColumns: MRT_ColumnDef<UserDto>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

export default function AdminExamPage() {
  const queryClient = useQueryClient();
  const isMutating = useIsMutating({ mutationKey: ["assign-exam"] });

  const [examToAssign, setExamToAssign] = useState<ExamDto>();
  const [selectedUsers, setSelectedUsers] = useState<MRT_RowSelectionState>({});

  const { data: exams = [], isFetching: isExamsLoading } = useQuery({
    queryKey: ["exams"],
    queryFn: examService.getList,
  });

  const { data: users = [], isFetching: isUsersLoading } = useQuery({
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
      userIds: Object.keys(selectedUsers),
    });

  useEffect(() => {
    setSelectedUsers(
      examToAssign?.assignedTo.reduce(
        (acc, user) => ({ ...acc, [user.id]: true }),
        {}
      ) || {}
    );
  }, [examToAssign]);

  return (
    <div className="min-h-full p-6 space-y-4">
      <Modal
        size={"auto"}
        opened={!!examToAssign}
        title="Assign Exam To Students"
        onClose={() => setExamToAssign(undefined)}
      >
        <MantineReactTable
          columns={userTableColumns}
          data={users}
          state={{
            isLoading: isUsersLoading || !!isMutating,
            rowSelection: selectedUsers,
          }}
          enableRowSelection
          onRowSelectionChange={setSelectedUsers}
          getRowId={(originalRow) => originalRow.id}
        />
        <Button
          my={"md"}
          fullWidth
          onClick={onExamAssign}
          loading={!!isMutating}
        >
          Assign to selected students
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

      <MantineReactTable
        columns={examTableColumns}
        data={exams}
        state={{ isLoading: isExamsLoading }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Button onClick={() => onAssignToStudentClick(row.original)}>
            Assign To Student
          </Button>
        )}
      />
    </div>
  );
}
