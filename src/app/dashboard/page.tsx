"use client";

import { Button } from "@mantine/core";
import React from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col gap-4 p-4">
      <Button
        variant="light"
        size="xl"
        onClick={() => router.push("/questions/addnew")}
      >
        Add new question
      </Button>

      <Button
        variant="outline"
        size="xl"
        onClick={() => router.push("/questionSet/addnew")}
      >
        Create question set
      </Button>
    </div>
  );
}
