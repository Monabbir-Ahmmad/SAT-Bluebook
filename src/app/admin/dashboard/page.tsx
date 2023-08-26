"use client";

import { Divider, Paper } from "@mantine/core";

import AdminDashboardOptions from "@/components/dashboard/AdminDashboardOptions";
import { MdAdminPanelSettings as EducationIcon } from "react-icons/md";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
  const session = useSession();

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-5 p-4">
      <EducationIcon size={64} className="text-primary" />

      <h1 className="font-bold text-primary">Admin Dashboard</h1>

      <Paper className="w-full p-6 gap-5 flex relative border border-l-8 border-l-primary">
        <h1 className="w-9/12 text-text-color">
          Welcome{" "}
          <span className="text-primary font-bold">
            {session?.data?.user?.name}!
          </span>{" "}
          You are logged in as an admin.
        </h1>

        <Image
          src={"/admin.svg"}
          alt="admin"
          width={300}
          height={300}
          className="absolute -bottom-3 right-0"
        />
      </Paper>

      <Divider
        label={<h1 className="text-2xl text-text-color">Prepare Tests</h1>}
        labelPosition="left"
      />

      <AdminDashboardOptions />
    </div>
  );
}
