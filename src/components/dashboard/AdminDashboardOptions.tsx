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
import { adminDashboardItems } from "@/constants/data";

export default function AdminDashboardOptions() {
  return (
    <Paper>
      <Accordion variant="contained">
        {adminDashboardItems.map((item) => (
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
                  { maxWidth: "md", cols: 3 },
                  { maxWidth: "sm", cols: 1 },
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
