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
import { ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ProjectRecord } from "@/interfaces/project-record"

import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: ProjectRecord[] = [
    {
      project_id: 1,
      name: "Västerbotten Woodland",
      description: "A dense boreal forest in northern Sweden, known for its rich biodiversity and reindeer grazing areas.",
      owner: "Norma Elizondo",
      date: "2025-03-18"
    },
    {
      project_id: 2,
      name: "Dalarna Pine Reserve",
      description: "A vast pine-dominated region in central Sweden, home to ancient trees and extensive hiking trails.",
      owner: "Rodrigo Eguiluz",
      date: "2025-02-10"
    },
    {
      project_id: 3,
      name: "Småland Forests",
      description: "Located in southern Sweden, these forests are characterized by a mix of conifers and broadleaf trees.",
      owner: "Juan Cuevas",
      date: "2025-01-22"
    },
    {
      project_id: 4,
      name: "Gotland Oak Groves",
      description: "A unique ecosystem on the island of Gotland, featuring ancient oak trees and limestone-rich soil.",
      owner: "Norma Elizondo",
      date: "2025-04-05"
    },
    {
      project_id: 5,
      name: "Jämtland Highlands",
      description: "A high-altitude forested region in western Sweden, offering a mix of spruce, birch, and alpine meadows.",
      owner: "Rodrigo Eguiluz",
      date: "2025-03-02"
    }
  ];  
  
  export const columns: ColumnDef<ProjectRecord>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "owner",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Owner
            <ArrowUpDown />
          </Button>
        );
      }
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        );
      }
    },
    {
      accessorKey: "project_id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button variant="secondary" size="sm">View</Button>
          </Link>
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="ghost" size="sm">Delete</Button>
        </div>
      ),
    }    
  ];
  

export function ProjectTable() {
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
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input // Search input
          placeholder="Filter projects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
