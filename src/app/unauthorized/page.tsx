"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <object
        data={"/unauthorized.svg"}
        type="image/svg+xml"
        className="h-2/3 mx-auto"
      />

      <Button
        size="lg"
        radius={"xl"}
        variant="gradient"
        w={300}
        onClick={() => router.back()}
      >
        Take me back
      </Button>
    </div>
  );
}
