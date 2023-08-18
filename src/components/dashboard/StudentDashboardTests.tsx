import {
  Accordion,
  Avatar,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";

import Link from "next/link";
import { studentDashboardItems } from "@/constants/data";

export default function StudentDashboardTests() {
  return (
    <Paper>
      <Accordion variant="contained">
        {studentDashboardItems.map((item) => (
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
              <SimpleGrid cols={3}>
                {item.content.map((content) => (
                  <Link key={content.id} href={content.href}>
                    <Paper
                      withBorder
                      className="h-full p-4 hover:shadow-lg transition-shadow"
                    >
                      <Group noWrap>
                        <Avatar src={content.image} radius="xl" size="xl" />
                        <div>
                          <Text>{content.label}</Text>
                          <Text size="sm" color="dimmed" weight={400}>
                            {content.description}
                          </Text>
                        </div>
                      </Group>
                    </Paper>
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
