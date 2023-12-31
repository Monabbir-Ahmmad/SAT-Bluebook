import { Button, Text } from "@mantine/core";

import { UserRoles } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Hero() {
  const router = useRouter();
  const session = useSession();

  const onGetStartedClick = () => {
    if (session?.data?.user?.role === UserRoles.ADMIN) {
      router.push("/admin/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />
      <div className="h-screen relative flex flex-col gap-8 justify-center items-start text-white max-w-6xl mx-auto p-6">
        <h1 className="text-7xl font-bold max-w-4xl">
          City{" "}
          <Text component="span" inherit variant="gradient">
            Smarts
          </Text>
        </h1>
        <p className="text-2xl max-w-3xl">
          This software is designed to help students prepare for the SAT exam by
          providing them with a realistic testing experience.
        </p>

        <div className="flex gap-5">
          <Button variant="gradient" size="xl" onClick={onGetStartedClick}>
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
