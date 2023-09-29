"use client";

import { Box, Button } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { download, generateCsv, mkConfig } from "export-to-csv"; //or use your library of choice here

import { IconDownload } from "@tabler/icons-react";
import { examService } from "@/lib/client/services";
import { useQuery } from "@tanstack/react-query";

const data = [
  {
    id: 1,
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",
  },
  {
    id: 2,
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",
  },
  {
    id: 3,
    firstName: "Frieda",
    lastName: "Baumbach",
    company: "Heidenreich, Grady and Durgan",
    city: "Volkmanside",
    country: "Croatia",
  },
  {
    id: 4,
    firstName: "Zachery",
    lastName: "Brown",
    company: "Cormier - Skiles",
    city: "Faychester",
    country: "Saint Pierre and Miquelon",
  },
  {
    id: 5,
    firstName: "Kendra",
    lastName: "Bins",
    company: "Wehner - Wilderman",
    city: "New Valentin",
    country: "Senegal",
  },
  {
    id: 6,
    firstName: "Lysanne",
    lastName: "Fisher",
    company: "Schmidt LLC",
    city: "Malachitown",
    country: "Costa Rica",
  },
  {
    id: 7,
    firstName: "Garrick",
    lastName: "Ryan",
    company: "Ryan - Buckridge",
    city: "East Pearl",
    country: "Cocos (Keeling) Islands",
  },
  {
    id: 8,
    firstName: "Hollis",
    lastName: "Medhurst",
    company: "Quitzon Group",
    city: "West Sienna",
    country: "Papua New Guinea",
  },
  {
    id: 9,
    firstName: "Arlo",
    lastName: "Buckridge",
    company: "Konopelski - Spinka",
    city: "Chino",
    country: "Congo",
  },
  {
    id: 10,
    firstName: "Rickie",
    lastName: "Auer",
    company: "Lehner - Walsh",
    city: "Nyahfield",
    country: "Sudan",
  },
  {
    id: 11,
    firstName: "Isidro",
    lastName: "Larson",
    company: "Reichert - Paucek",
    city: "Fort Rosinaside",
    country: "Belize",
  },
  {
    id: 12,
    firstName: "Bettie",
    lastName: "Skiles",
    company: "Zulauf, Flatley and Rolfson",
    city: "West Feltonchester",
    country: "Poland",
  },
];
//defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: "id",
    header: "ID",
    size: 40,
  },
  {
    accessorKey: "studentId",
    header: "Student ID",
    size: 120,
  },
  {
    accessorKey: "Total Score",
    header: "Total Score",
    size: 120,
  },
  {
    accessorKey: "company",
    header: "Company",
    size: 300,
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
    size: 220,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

export default function AdminExamDetailsPage({
  params: { examId },
}: {
  params: { examId: string };
}) {
  const { data: examResults = [], isFetching } = useQuery({
    enabled: !!examId,
    queryKey: ["exam-results-details", examId],
    queryFn: async () => await examService.getExamById(examId),
  });

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
    data,
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
    ),
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Button
        onClick={() => alert(`You clicked on row ${row.original.id}`)}
        variant="link"
      >
        Click Me
      </Button>
    ),
  });

  return <MantineReactTable table={table} />;
}
