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

import { RiCheckLine as CheckIcon } from "react-icons/ri";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { ExamDto } from "@/dtos/exam.dto";
import Link from "next/link";
import { UserDto } from "@/dtos/user.dto";
import { notifications } from "@mantine/notifications";

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

export default function AdminExamDetailsPage() {
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
    onMutate: () => {
      notifications.show({
        id: "assign-exam",
        title: "Assigning Exam",
        message: "Please wait while we assign the exam to the students.",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    },
    onSuccess: (data) => {
      notifications.update({
        id: "assign-exam",
        title: "Exam Assigned",
        message: "Exam has been assigned to the students.",
        color: "green",
        icon: <CheckIcon />,
      });

      setExamToAssign(undefined);
      queryClient.setQueryData<ExamDto[]>(
        ["exams"],
        (prev) => prev?.map((exam) => (exam.id === data.id ? data : exam)) || []
      );
    },
    onError: (err: any) => {
      notifications.update({
        id: "assign-exam",
        title: "Error",
        message: err.response?.data?.message,
        color: "red",
      });
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
      <Divider
        label={<h1 className="text-text-color font-semibold">Exam details</h1>}
      />

      <DashboardCard
        label={"Create New Exam"}
        description={"Create a new exam to assign to students"}
        image="https://img.icons8.com/clouds/256/000000/document.png"
      />

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
          <div className="flex gap-4 items-center">
            <Button onClick={() => onAssignToStudentClick(row.original)}>
              Assign To Student
            </Button>
            <Link
              href={`/admin/exam/details/${row.original.id}`}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Details
            </Link>
          </div>
        )}
      />
    </div>
  );
}
