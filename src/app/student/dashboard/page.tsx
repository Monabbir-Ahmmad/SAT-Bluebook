"use client";

import { Divider, Paper } from "@mantine/core";

import { GiGraduateCap as EducationIcon } from "react-icons/gi";
import Image from "next/image";
import StudentDashboardTests from "@/components/dashboard/StudentDashboardTests";
import { useSession } from "next-auth/react";

export default function StudentDashboardPage() {
  const session = useSession();

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-5 p-4">
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

      <Divider
        label={<h1 className="text-2xl text-text-color">Take Exams</h1>}
        labelPosition="left"
      />

      <StudentDashboardTests />

      <Divider
        label={<h1 className="text-2xl text-text-color">Previous Exams</h1>}
        labelPosition="left"
      />
    </div>
  );
}
