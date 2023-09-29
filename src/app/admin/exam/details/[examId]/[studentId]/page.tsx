"use client";

import { Box, Button } from "@mantine/core";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { answerType, sections } from "@/constants/data";
import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here
import { useEffect, useState } from "react";

import { ExamQuestionAnswerResultDto } from "@/dtos/exam.dto";
import { IconDownload } from "@tabler/icons-react";
import { OptionTypes } from "@/constants/enums";
import { examService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

const columns: MRT_ColumnDef<ExamQuestionAnswerResultDto>[] = [
  {
    accessorKey: "section",
    header: "Section",
    Cell: ({ row }) =>
      sections.find((s) => s.value == row.original.section)?.label,
  },
  {
    accessorKey: "optionType",
    header: "Answer Type",
    Cell: ({ row }) =>
      answerType.find((a) => a.value == row.original.optionType)?.label,
  },
  {
    accessorKey: "selectedOption",
    header: "Submitted Answer",
    Cell: ({ row }) => {
      if (row.original.textAnswer) return row.original.textAnswer;
      if (!row.original.selectedOption) return "Not answered";
      return String.fromCharCode(97 + row.original.selectedOption);
    },
  },
  {
    accessorFn: (row) => {
      if (row.optionType == OptionTypes.GRID_IN) {
        return row.options[0].text;
      }
      return row?.answers
        ?.map((answer) => String.fromCharCode(97 + answer))
        .join(", ");
    },
    header: "Correct Answer",
  },
  {
    accessorKey: "isCorrect",
    header: "Is Correct?",
    Cell: ({ row }) => (row.original.isCorrect ? "Yes" : "No"),
  },
];

const csvConfig = (fileName: string) =>
  mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: fileName,
  });

export default function AdminExamDetailsByStudentPage({
  params: { examId, studentId },
}: {
  params: { examId: string; studentId: string };
}) {
  const [examTableData, setExamTableData] = useState<
    ExamQuestionAnswerResultDto[]
  >([]);

  const { data: examResult, isFetching } = useQuery({
    enabled: !!examId && !!studentId,
    queryKey: ["exam-results-details", examId, studentId],
    queryFn: async () =>
      await examService.getExamResultByStudent(studentId, examId),
  });

  useEffect(() => {
    let tableData: ExamQuestionAnswerResultDto[] = [];

    examResult?.sectionResults.forEach((sectionResult) => {
      tableData.push(...sectionResult.questions);
    });

    setExamTableData(tableData);
  }, [examResult]);

  const handleExportRows = (rows: any) => {
    const rowData = rows.map((row: any) => row.original);
    const csv = generateCsv(csvConfig("bal"))(rowData);
    download(csvConfig("bal"))(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig("bal"))(examTableData as any);
    download(csvConfig("bal"))(csv);
  };

  const table = useMantineReactTable({
    columns,
    data: examTableData || [],
    enableRowSelection: true,
    state: { isLoading: isFetching },
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
