import {
  Accordion,
  Avatar,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";

import DashboardCard from "./DashboardCard";
import Link from "next/link";

interface DashboardOptionsProps {
  options: {
    id: string;
    image: string;
    label: string;
    description: string;
    content: {
      id: string;
      href: string;
      label: string;
      description: string;
      image: string;
    }[];
  }[];
}

export default function DashboardOptions({ options }: DashboardOptionsProps) {
  return (
    <Paper>
      <Accordion variant="contained">
        {options.map((item) => (
          <Accordion.Item value={item.id} key={item.label}>
            <Accordion.Control>
              <Group noWrap>
                <Avatar src={item.image} radius="xl" size="xl" />
                <div>
                  <Text>{item.label}</Text>
                  <Text size="sm" color="dimmed" weight={400}>
                    {item.description}
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex gap-4 flex-col xl:flex-row">
                {item.content.map((content) => (
                  <Link key={content.id} href={content.href}>
                    <DashboardCard {...content} />
                  </Link>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Paper>
  );
}
