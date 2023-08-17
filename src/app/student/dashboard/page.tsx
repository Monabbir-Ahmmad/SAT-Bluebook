"use client";

import { Button, Divider, Paper, SimpleGrid } from "@mantine/core";

import DashboardButton from "@/components/dashboard/DashboardButton";
import { GiGraduateCap as EducationIcon } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function StudentDashboardPage() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-5 p-4">
      <EducationIcon size={64} className="text-primary" />

      <h1 className="font-bold text-primary">Student Dashboard</h1>

      <Paper className="w-full p-6 gap-5 flex relative border border-l-8 border-l-primary">
        <object
          type="image/svg+xml"
          data="/study.svg"
          className="w-72 absolute -bottom-11 right-0"
        />

        <h1 className="w-4/5 text-text-color">
          Welcome{" "}
          <span className="text-primary font-bold">
            {session?.data?.user?.name}!
          </span>{" "}
          You are logged in as a student.
        </h1>
      </Paper>

      <Divider
        label={<h1 className="text-2xl text-text-color">Sections</h1>}
        labelPosition="left"
      />

      <SimpleGrid cols={3}>
        <DashboardButton
          href="/student/section/math"
          text="Mathmatics"
          image="/math.svg"
        />

        <DashboardButton
          href="/student/section/reading"
          text="Reading"
          image="/reading.svg"
        />

        <DashboardButton
          href="/student/section/writing"
          text="Writing"
          image="/writing.svg"
        />
      </SimpleGrid>
    </div>
  );
}
