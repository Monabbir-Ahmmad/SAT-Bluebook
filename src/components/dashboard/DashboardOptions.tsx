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
import { adminDashboardOptions } from "@/constants/data";

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
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: "xl", cols: 3 },
                  { maxWidth: "lg", cols: 1 },
                ]}
              >
                {item.content.map((content) => (
                  <Link key={content.id} href={content.href}>
                    <DashboardCard {...content} />
                  </Link>
                ))}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Paper>
  );
}
