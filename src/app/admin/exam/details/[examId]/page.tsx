"use client";

import { Button } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { mkConfig } from "export-to-csv";
import { ExamAttendedByDto } from "@/dtos/exam.dto";
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
          View details
        </Button>
      )}
    />
  );
}
