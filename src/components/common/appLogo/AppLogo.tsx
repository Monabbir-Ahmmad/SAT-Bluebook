import { Text } from "@mantine/core";
import Link from "next/link";

type AppLogoProps = {
  size?: number;
  className?: string;
};

function AppLogo({ size = 30, className }: AppLogoProps) {
  return (
    <Link href="/" className={className}>
      <h1
        className="font-bold"
        style={{
          fontSize: size,
        }}
      >
        <Text component="span" inherit variant="gradient">
          SAT Bluebook
        </Text>
      </h1>
    </Link>
  );
}

export default AppLogo;
