"use client";

import { Button, TransferList, TransferListData } from "@mantine/core";

import QuestionItem from "@/components/questionSet/QuestionItem";
import { questions } from "@/constants/data";
import { useState } from "react";

const mockdata = questions.map((question) => ({
  value: question.id,
  label: question.question,
  group: question.subject,
  ...question,
}));

export default function Page() {
  const [data, setData] = useState<TransferListData>([mockdata, []]);

  const onSubmit = () => {
    console.log(data[1]);
  };

  return (
    <div>
      <div className="px-6 py-2.5 bg-white shadow z-10 flex items-center justify-between sticky top-16">
        <h1 className="text-2xl font-semibold">Create Question Set</h1>
        <Button
          variant="gradient"
          uppercase
          disabled={data[1].length === 0}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>

      <TransferList
        m={26}
        value={data}
        onChange={setData}
        listHeight={700}
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
