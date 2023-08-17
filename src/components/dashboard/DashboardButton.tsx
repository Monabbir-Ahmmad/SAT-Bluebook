import { Avatar, Group, Text } from "@mantine/core";

import Link from "next/link";

type DashboardButtonProps = {
  href: string;
  image: string;
  label: string;
  description: string;
};

export default function DashboardButton({
  href,
  image,
  label,
  description,
}: DashboardButtonProps) {
  return (
    <Link
      href={href}
      className="border bg-white p-4 rounded hover:shadow-lg transition-shadow"
    >
      <Group noWrap>
        <Avatar src={image} radius="xl" size="xl" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {description}
          </Text>
        </div>
      </Group>
    </Link>
  );
}
