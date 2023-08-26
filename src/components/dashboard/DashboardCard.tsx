import { Avatar, Group, Paper, Text } from "@mantine/core";

import React from "react";

interface PropType {
  image: string;
  label: string;
  description: string;
}

export default function DashboardCard({ image, label, description }: PropType) {
  return (
    <Paper withBorder className="h-full p-4 hover:shadow-lg transition-shadow">
      <Group noWrap>
        <Avatar src={image} radius="xl" size="xl" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {description}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
