import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Loader2 } from "lucide-react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FileRecord } from "@/interfaces/file-record"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: FileRecord[] = [
    {
      fileName: "scan1.las",
      createdAt: "15-01-2024",
      status: "Segmented",
      segmented: true,
    },
    {
      fileName: "scan2.laz",
      createdAt: "20-02-2024",
      status: "Segmented",
      segmented: true,
    },
    {
      fileName: "scan3.las",
      createdAt: "05-03-2024",
      status: "In Progress",
      segmented: false,
    },
    {
      fileName: "scan4.laz",
      createdAt: "20-04-2024",
      status: "Segmented",
      segmented: true,
    },
    {
      fileName: "scan5.las",
      createdAt: "12-05-2024",
      status: "Failed",
      segmented: false,
    },
  ];
  
  export const columns: ColumnDef<FileRecord>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: CheckedState) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked: CheckedState) => row.toggleSelected(!!checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fileName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            File
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("fileName")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Created At</div>,
      cell: ({ row }) => {
        const rawDate = row.getValue("createdAt") as string;
        const [day, month, year] = rawDate.split("-").map(Number);
        const date = new Date(year, month - 1, day); // JavaScript usa meses base 0
  
        const formatted = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
        accessorKey: "segmented",
        header: "Segmented",
        cell: ({ row }) => (
            row.getValue("segmented") ? (
                <div className="flex items-center">
                  <Link to="/visualization">
                    <Button variant="secondary" size="sm">Visualize</Button>
                  </Link>
                    <Button variant="ghost" size="sm">Delete</Button>
                </div>
            ) : (
                <Button disabled variant="outline" size="sm">
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button>
            )
        ),
    }
  ];
  

export function FilesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full rounded-lg shadow-lg p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter files..."
          value={(table.getColumn("fileName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fileName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
