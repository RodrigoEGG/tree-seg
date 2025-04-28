import * as React from "react"
import { useEffect, useState } from "react"

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
import EditProjectModal from "@/components/edit-project"
import NewProjectModal from "@/components/new-project"

import { Input } from "@/components/ui/input"
import { projectServices } from "@/services/project-api"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector } from "react-redux"
import { selectToken } from "@/redux/slices/useSlice"

export function ProjectTable() {
  const token = useSelector(selectToken);
  // State to store projects data from API
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // States for table functionality
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Function to refresh projects data
  const refreshProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectServices.getProjects(token);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add download handler function
  const handleDownload = (projectId: number) => {
    console.log(`Downloading project ${projectId}`);
    // Missing download implementation here
  };

  // Add delete handler function
  const handleDelete = async (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectServices.deleteProject(projectId, token);
        await refreshProjects(); // Refresh after deletion
      } catch (err) {
        console.error("Error deleting project:", err);
        setError(err instanceof Error ? err.message : "Failed to delete project");
      }
    }
  };

  // Define columns with access to the refreshProjects function
  const columns: ColumnDef<ProjectRecord>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div><strong>{row.getValue("name")}</strong></div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div>{row.getValue("description")}</div>
      ),
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <div>{date.toLocaleDateString()}</div>;
      }
    },
    {
      accessorKey: "project_id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Link to={`/app/project/files/${row.getValue("project_id")}`}>
            <Button size="sm" asChild>
              <span>View</span>
            </Button>
          </Link>
          <EditProjectModal
            projectId={row.getValue("project_id")}
            onProjectUpdated={refreshProjects}
          />
        </div>
      ),
    }
  ];

  // Fetch projects from the API
  useEffect(() => {
    refreshProjects();
  }, []);

  const table = useReactTable({
    data: projects,
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
  });

  return (
    <div className="w-full">
      <div className="flex py-4">
        <Input
          placeholder="Filter projects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto">
          <NewProjectModal onProjectAdded={refreshProjects} />
        </div>
      </div>

      {isLoading ? (
        (
          <div className="flex items-center justify-center h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-lg font-semibold">Loading Projects...</p>
              <p className="text-sm text-gray-500">Please wait a moment.</p>
            </div>
          </div>
        )
      ) : error ? (
        <div className="text-red-500 py-4">
          Error: {error}. Please try again.
        </div>
      ) : (
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
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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