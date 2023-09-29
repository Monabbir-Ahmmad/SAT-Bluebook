"use client";

import { Box, Button } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here

import { IconDownload } from "@tabler/icons-react";
import { examService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    accessorKey: "question_id",
    header: "Question ID",
    size: 40,
  },
  {
    accessorKey: "section",
    header: "Section",
    size: 120,
  },
  {
    accessorKey: "selected_option",
    header: "Selected Option",
    size: 120,
  },
  {
    accessorKey: "correct_option",
    header: "Correct option",
    size: 120,
  },
  {
    accessorKey: "is_correct",
    header: "Is correct?",
    size: 120,
    accessorFn: (row) => (row.is_correct ? "Yes" : "No"),
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
//   filename: `exam-results-for-${examForStudent.attendedBy.}`,
});

export default function AdminExamDetailsByStudentPage({
  params: { examId },
}: {
  params: { examId: string };
}) {
  const { data: exam, isFetching } = useQuery({
    enabled: !!examId,
    queryKey: ["exam-results-details", examId],
    queryFn: async () => await examService.getExamById(examId),
  });
  const examForStudent = exam?.attendedBy?.find(
    (result) => result.user.id === "6516c6491f4e241d2ddd0fd5"
  );
  const examResult = examForStudent?.result;
  const data = examResult?.sectionResults.flatMap((sectionResult) =>
    sectionResult.questions.map((question) => ({
      question_id: question.id,
      section: sectionResult.section,
      selected_option: question.selectedOption,
      correct_option: question.answers[0],
      is_correct: question.isCorrect,
    }))
  );
  console.log("🚀 ~ file: page.tsx:173 ~ data:\n", data);
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    columns,
    data: data || [],
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          color="lightblue"
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
}
