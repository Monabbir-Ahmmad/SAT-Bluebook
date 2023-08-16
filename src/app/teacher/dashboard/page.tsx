"use client";

import { Button, Divider, Paper } from "@mantine/core";

import EducationIcon from "remixicon-react/Book2FillIcon";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TeacherDashboardPage() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6 p-4">
      <EducationIcon size={64} className="text-primary" />

      <h1 className="font-bold text-primary">Teacher Dashboard</h1>

      <Paper className="w-full p-6 gap-5 flex relative border border-l-8 border-l-primary">
        <object
          type="image/svg+xml"
          data="/study.svg"
          className="w-72 absolute -bottom-5 right-0"
        />

        <h1 className="w-4/5">
          Welcome{" "}
          <strong className="text-primary">{session?.data?.user?.name}!</strong>{" "}
          You are logged in as a teacher.
        </h1>
      </Paper>

      <Divider
        label={<h1 className="text-2xl text-slate-700">Available Tests</h1>}
        labelPosition="left"
      />

      <Button
        variant="light"
        size="xl"
        onClick={() => router.push("/teacher/question/create")}
      >
        Create Question
      </Button>

      <Button
        variant="light"
        size="xl"
        onClick={() => router.push("/teacher/question-set/create")}
      >
        Create Question Set
      </Button>
    </div>
  );
}
