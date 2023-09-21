"use client";

import { Badge, Button, Divider } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UserDto } from "@/dtos/user.dto";
import { UserRoles } from "@/constants/enums";
import { notifications } from "@mantine/notifications";
import { userManagementService } from "@/lib/client/services";

const userTableColumns: MRT_ColumnDef<UserDto>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    Cell: ({ row }) => (
      <Badge color={row.original.role === UserRoles.ADMIN ? "green" : "blue"}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined At",
    Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
];

export default function UserManagementPage() {
  const queryClient = useQueryClient();

  const { data: users = [], isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: userManagementService.getUsers,
  });

  const { mutate: updateAdminMutation, isLoading: isMutationLoading } =
    useMutation({
      mutationFn: userManagementService.updateAdminRole,
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err: any, variables: string) => {
        notifications.update({
          id: "update-admin" + variables,
          title: "Error",
          message: err.response?.data?.message,
          color: "red",
        });
      },
    });

  const onUpdateAdmin = (id: string) => updateAdminMutation(id);

  return (
    <div className="min-h-full p-6 space-y-4">
      <Divider
        label={<h1 className="text-text-color font-semibold">Users</h1>}
      />

      <MantineReactTable
        columns={userTableColumns}
        data={users}
        state={{ isLoading: isFetching || isMutationLoading }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Button
            color={row.original.role === UserRoles.ADMIN ? "red" : "blue"}
            onClick={() => onUpdateAdmin(row.original.id)}
          >
            {row.original.role === UserRoles.ADMIN
              ? "Remove Admin"
              : "Make Admin"}
          </Button>
        )}
      />
    </div>
  );
}
