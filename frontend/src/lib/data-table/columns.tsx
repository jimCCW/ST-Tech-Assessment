import { ColumnDef } from "@tanstack/react-table";
import { TCsvData } from "@/types/upload";

export const csvDataColumns: ColumnDef<TCsvData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "body",
    header: "Body",
    enableGlobalFilter: true,
  },
];
