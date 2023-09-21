"use client";

import { Badge, Button, Divider } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UserDto } from "@/dtos/user.dto";
import { UserRoles } from "@/constants/enums";
import { notifications } from "@mantine/notifications";
import { userManagementService } from "@/lib/client/services";

const userTableColumns = ({
  onUpdateAdmin,
}: {
  onUpdateAdmin: (id: string) => any;
}): DataTableColumn<UserDto>[] => [
  {
    accessor: "id",
    title: "#",
    width: 250,
    textAlignment: "right",
  },
  { accessor: "name" },
  { accessor: "email" },
  {
    accessor: "role",
    render: ({ role }) => (
      <Badge color={role === UserRoles.ADMIN ? "green" : "blue"}>{role}</Badge>
    ),
  },
  {
    accessor: "createdAt",
    title: "Joined At",
    render: ({ createdAt }) => new Date(createdAt).toLocaleString(),
  },
  {
    accessor: "actions",
    title: "Actions",
    textAlignment: "center",
    render: ({ id, role }) => (
      <Button
        color={role === UserRoles.ADMIN ? "red" : "blue"}
        fullWidth
        onClick={() => onUpdateAdmin(id)}
      >
        {role === UserRoles.ADMIN ? "Remove Admin" : "Make Admin"}
      </Button>
    ),
  },
];

export default function UserManagementPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userManagementService.getUsers,
    initialData: [],
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

      <DataTable
        striped
        height={"80vh"}
        withBorder
        borderRadius="sm"
        highlightOnHover
        loaderVariant="bars"
        loaderSize="xl"
        fetching={isLoading || isMutationLoading}
        records={data}
        columns={userTableColumns({
          onUpdateAdmin,
        })}
      />
    </div>
  );
}
