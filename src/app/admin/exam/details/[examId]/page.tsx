"use client";

import { Box, Button } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { download, generateCsv, mkConfig } from "export-to-csv";

import { ExamAttendedByDto } from "@/dtos/exam.dto";
import { IconDownload } from "@tabler/icons-react";
import { examService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const examDetailsTableColumns: MRT_ColumnDef<ExamAttendedByDto>[] = [
  {
    accessorFn: (row) => row.user?.id,
    header: "Student ID",
  },
  {
    accessorFn: (row) => row.user?.name,
    header: "Student Name",
  },
  {
    accessorFn: (row) => row.user?.email,
    header: "Student Email",
  },
  {
    accessorFn: (row) =>
      row.result?.sectionResults?.reduce((a, b) => a + b.score, 0),
    header: "Score",
  },
  {
    accessorFn: (row) =>
      row.result?.sectionResults?.reduce((a, b) => a + b.timeTaken, 0),
    header: "Time Taken",
  },
];

export default function AdminExamDetailsPage({
  params: { examId },
}: {
  params: { examId: string };
}) {
  const router = useRouter();

  const { data: exam, isFetching } = useQuery({
    enabled: !!examId,
    queryKey: ["exam-results-details", examId],
    queryFn: async () => await examService.getExamById(examId),
  });

  const handleExportRows = (rows: any) => {
    // const rowData = rows.map((row) => row.original);
    // const csv = generateCsv(csvConfig)(rowData);
    // download(csvConfig)(csv);
  };

  const handleExportData = () => {
    // const csv = generateCsv(csvConfig)(exam?.attendedBy ?? []);
    // download(csvConfig)(csv);
  };

  return (
    <MantineReactTable
      columns={examDetailsTableColumns}
      data={exam?.attendedBy || []}
      state={{ isLoading: isFetching }}
      enableRowActions
      positionActionsColumn="last"
      columnFilterDisplayMode="popover"
      paginationDisplayMode="pages"
      positionToolbarAlertBanner="bottom"
      renderRowActions={({ row }) => (
        <Button
          onClick={() =>
            router.push(`/admin/exam/details/${examId}/${row.original.user.id}`)
          }
        >
          Click Me
        </Button>
      )}
      renderTopToolbarCustomActions={({ table }) => (
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
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            leftIcon={<IconDownload />}
            variant="filled"
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
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
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
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
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            leftIcon={<IconDownload />}
            variant="filled"
          >
            Export Selected Rows
          </Button>
        </Box>
      )}
    />
  );
}
