"use client";

import { Divider, Paper, SimpleGrid } from "@mantine/core";

import DashboardButton from "@/components/dashboard/DashboardButton";
import { GiTeacher as EducationIcon } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TeacherDashboardPage() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-5 p-4">
      <EducationIcon size={64} className="text-primary" />

      <h1 className="font-bold text-primary">Teacher Dashboard</h1>

      <Paper className="w-full p-6 gap-5 flex relative border border-l-8 border-l-primary">
        <object
          type="image/svg+xml"
          data="/teach.svg"
          className="w-72 absolute -bottom-3 right-0"
        />

        <h1 className="w-4/5 text-text-color">
          Welcome{" "}
          <span className="text-primary font-bold">
            {session?.data?.user?.name}!
          </span>{" "}
          You are logged in as a teacher.
        </h1>
      </Paper>

      <Divider
        label={<h1 className="text-2xl text-text-color">Prepare Tests</h1>}
        labelPosition="left"
      />

      <SimpleGrid cols={3}>
        <DashboardButton
          href="/teacher/question/create"
          text="Create Question"
          image="/question.svg"
        />

        <DashboardButton
          href="/teacher/question-set/create"
          text="Create Question Set"
          image="/quiz.svg"
        />
      </SimpleGrid>
    </div>
  );
}
