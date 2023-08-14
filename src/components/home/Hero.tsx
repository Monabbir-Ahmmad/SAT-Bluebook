import { Button, Text } from "@mantine/core";

import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />
      <div className="h-[calc(100vh-64px)] relative flex flex-col gap-8 justify-center items-start text-white max-w-6xl mx-auto">
        <h1 className="text-7xl font-bold max-w-4xl">
          SAT{" "}
          <Text component="span" inherit variant="gradient">
            Bluebook
          </Text>
        </h1>
        <p className="text-xl max-w-3xl">
          The SAT Bluebook is a free, open-source SAT practice test generator.
          It is designed to help students prepare for the SAT by providing them
          with a realistic testing experience.
        </p>

        <div className="flex gap-5">
          <Button
            variant="gradient"
            size="xl"
            onClick={() => router.push("/auth/login")}
          >
            Get started
          </Button>

          <Button
            variant="white"
            size="xl"
            onClick={() => router.push("/dashboard")}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
