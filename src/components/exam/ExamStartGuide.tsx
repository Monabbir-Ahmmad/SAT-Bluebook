import { List, Text, ThemeIcon, Title } from "@mantine/core";

import { BsInfoLg as WarningIcon } from "react-icons/bs";

export default function ExamStartGuide() {
  return (
    <div className="space-y-8">
      <Title order={2}>Instructions</Title>

      <List
        spacing="lg"
        size="md"
        icon={
          <ThemeIcon size={24} radius="xl" variant="light">
            <WarningIcon size="1rem" />
          </ThemeIcon>
        }
      >
        <List.Item>
          Do not refresh the page or close the browser window during the exam.
        </List.Item>

        <List.Item>
          The exam will be automatically submitted when the time is up. You can
          also submit the exam manually at the end of each section.
        </List.Item>

        <List.Item>
          You can navigate between questions using the{" "}
          <Text component="span" color="blue">
            Next
          </Text>{" "}
          and{" "}
          <Text component="span" color="blue">
            Back
          </Text>{" "}
          buttons.
        </List.Item>

        <List.Item>
          You can mark a question for review using the{" "}
          <Text component="span" color="yellow">
            Mark for Review
          </Text>{" "}
          button.
        </List.Item>

        <List.Item>
          You can change your answer by selecting another option.
        </List.Item>

        <List.Item>
          You can mark options as wrong by clicking the{" "}
          <Text component="span" color="red">
            Mark as Wrong
          </Text>{" "}
          button.
        </List.Item>

        <List.Item>
          You can answer a question by clicking on the option or by typing in
          the text box for text answers.
        </List.Item>

        <List.Item>
          You can see the questions you have answered and the ones you have
          marked for review in the bottom bar by clicking the button with the
          question number.
        </List.Item>
      </List>
    </div>
  );
}
