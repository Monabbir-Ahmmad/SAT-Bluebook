"use client";

import {
  Button,
  TextInput,
  TransferList,
  TransferListData,
} from "@mantine/core";

import QuestionItem from "@/components/questionSet/QuestionItem";
import { questions } from "@/constants/data";
import { useState } from "react";

const mockdata = questions.map((question) => ({
  value: question.id,
  label: question.question,
  group: question.subject,
  ...question,
}));

export default function QuestionSetCreatePage() {
  const [data, setData] = useState<TransferListData>([mockdata, []]);

  const onSubmit = () => {
    console.log(data[1]);
  };

  return (
    <div>
      <div className="gap-4 px-6 py-2.5 bg-white shadow z-10 flex flex-col sm:flex-row sm:items-center justify-between sticky top-14">
        <TextInput
          size="md"
          placeholder="Enter question set title"
          className="w-full sm:max-w-2xl"
        />

        <Button
          variant="gradient"
          uppercase
          disabled={data[1].length === 0}
          onClick={onSubmit}
        >
          Create Question Set
        </Button>
      </div>

      <TransferList
        m={26}
        value={data}
        onChange={setData}
        listHeight={650}
        showTransferAll={false}
        searchPlaceholder="Search for questions..."
        nothingFound={
          <h1 className="text-2xl font-semibold text-center uppercase">
            Nothing to show!
          </h1>
        }
        titles={["Available questions", "Selected questions"]}
        breakpoint="sm"
        itemComponent={QuestionItem}
        filter={(query, item) =>
          item.label.toLowerCase().includes(query.toLowerCase().trim())
        }
        styles={{
          transferListTitle: {
            fontSize: 20,
            fontWeight: 600,
            textTransform: "uppercase",
          },
          transferListSearch: {
            fontSize: 18,
          },
          transferListItemHovered: { background: "transparent" },
          separatorLabel: {
            fontSize: 20,
            fontWeight: 600,
          },
        }}
      />
    </div>
  );
}
