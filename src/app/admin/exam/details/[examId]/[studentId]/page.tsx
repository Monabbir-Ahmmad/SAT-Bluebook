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
import { useEffect, useState } from "react";
import { ExamQuestionAnswerResultDto } from "@/dtos/exam.dto";
import { OptionTypes } from "@/constants/enums";

const columns: MRT_ColumnDef<ExamQuestionAnswerResultDto>[] = [
  {
    accessorKey: "section",
    header: "Section",
    size: 120,
  },
  {
    accessorKey: "selectedOption",
    header: "Submitted Answer",
    size: 120,
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
    size: 120,
  },
  {
    header: "Is correct?",
    size: 120,
    accessorFn: (row) => (row.isCorrect ? "Yes" : "No"),
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

  const { data: exam, isFetching } = useQuery({
    enabled: !!examId,
    queryKey: ["exam-results-details", examId],
    queryFn: async () => await examService.getExamById(examId),
  });
  const examForStudent = exam?.attendedBy?.find(
    (result) => result.user.id === studentId
  );

  useEffect(() => {
    let tableData: ExamQuestionAnswerResultDto[] = [];

    examForStudent?.result?.sectionResults.forEach((sectionResult) => {
      tableData.push(...sectionResult.questions);
    });
    setExamTableData(tableData);
  }, [exam]);

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
