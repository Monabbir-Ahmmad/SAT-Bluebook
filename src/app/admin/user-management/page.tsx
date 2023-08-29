"use client";

import { DataTable, DataTableColumn } from "mantine-datatable";

import { Badge, Button, Divider } from "@mantine/core";
import { userManagementService } from "@/lib/client/services";
import { UserDto } from "@/dtos/user.dto";
import { UserRoles } from "@/constants/enums";
import { useQuery } from "@tanstack/react-query";

const userTableColumns: DataTableColumn<UserDto>[] = [
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
    render: ({ role }) =>
      role === UserRoles.ADMIN ? (
        <Button color="red" fullWidth>
          Remove Admin
        </Button>
      ) : (
        <Button fullWidth>Make Admin</Button>
      ),
  },
];

export default function UserManagementPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userManagementService.getUsers,
  });

  return (
    <div className="min-h-full p-6 space-y-4">
      <Divider
        label={<h1 className="text-text-color font-semibold">Users</h1>}
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
        records={data!}
        columns={userTableColumns}
      />
    </div>
  );
}
