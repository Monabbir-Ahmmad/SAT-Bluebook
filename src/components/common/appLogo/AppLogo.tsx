import Link from "next/link";
import { GiBrainstorm as Logo } from "react-icons/gi";
import { Text } from "@mantine/core";

type AppLogoProps = {
  size?: number;
  className?: string;
};

function AppLogo({ size = 25, className }: AppLogoProps) {
  return (
    <Link href="/" className={className}>
      <h1
        className="font-bold flex gap-2 items-center justify-center"
        style={{
          fontSize: size,
        }}
      >
        <Logo size={size + 5} className="text-primary" />
        <Text component="span" inherit variant="gradient">
          City Smarts
        </Text>
      </h1>
    </Link>
  );
}

export default AppLogo;
