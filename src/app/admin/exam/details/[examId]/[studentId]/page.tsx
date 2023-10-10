"use client";

import { Button, Title } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
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
    accessorKey: "selectedOption",
    header: "Submitted Answer",
    Cell: ({ row }) => {
      if (row.original.textAnswer) return row.original.textAnswer;
      if (row.original.selectedOption === undefined) return "Not answered";
      return String.fromCharCode(97 + row.original.selectedOption);
    },
  },
  {
    accessorKey: "isCorrect",
    header: "Answer Status",
    Cell: ({ row }) => (row.original.isCorrect ? "Correct" : "Incorrect"),
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

  return (
    <div className="p-6 space-y-6">
      <Title order={3}>Student Exam Result Details</Title>

      <div className="space-y-3">
        <Title order={4}>Answered Question Details</Title>

        <MantineReactTable
          columns={columns}
          data={examTableData || []}
          enableRowSelection={true}
          state={{ isLoading: isFetching }}
          columnFilterDisplayMode="popover"
          paginationDisplayMode="pages"
          positionToolbarAlertBanner="bottom"
          renderTopToolbarCustomActions={({ table }) => (
            <div className="flex gap-4 flex-wrap">
              <Button
                disabled={!examTableData.length}
                onClick={handleExportData}
                leftIcon={<IconDownload />}
              >
                Export All Data
              </Button>
              <Button
                disabled={
                  !examTableData.length ||
                  !table.getPrePaginationRowModel().rows.length
                }
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                leftIcon={<IconDownload />}
              >
                Export All Rows
              </Button>
              <Button
                disabled={
                  !examTableData.length || !table.getRowModel().rows.length
                }
                onClick={() => handleExportRows(table.getRowModel().rows)}
                leftIcon={<IconDownload />}
              >
                Export Page Rows
              </Button>
              <Button
                disabled={
                  !examTableData.length ||
                  (!table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected())
                }
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                leftIcon={<IconDownload />}
              >
                Export Selected Rows
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
