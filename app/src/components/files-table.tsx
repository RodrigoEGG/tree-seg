import React, { useEffect, useState } from 'react';
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
import { ArrowUpDown, Columns, Loader2} from "lucide-react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Link, useParams } from "react-router-dom"

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

import UploadDataModal from "./ui/modal"
import { useSelector } from "react-redux"
import { selectToken } from "@/redux/slices/useSlice"
import { fileServices } from '@/services/file-api';
import MenuFile from './menu-file';

export const getColumns = (
    refreshFiles: () => Promise<void>,
	projectid : number
  ): ColumnDef<FileRecord>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: CheckedState) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked: CheckedState) =>
            row.toggleSelected(!!checked)
          }
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "file_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("file_name")}</div>
      ),
    },
    {
      accessorKey: "is_segmented",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("is_segmented")}</div>
      ),
    },
    {
      accessorKey: "date_uploaded",
      header: () => <div className="text-right">Created At</div>,
      cell: ({ row }) => {
        const rawDate = row.getValue("date_uploaded") as string;
        const [day, month, year] = rawDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);
  
        const formatted = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "is_segmented",
      header: "Segmented",
      cell: ({ row }) =>
        row.getValue("is_segmented") ? (
          <div className="flex items-center space-x-2">
            <Link to={`/app/view/${projectid}/${row.original.file_id}`}>
				<Button>
					View
                </Button>
            </Link>
			<MenuFile
				fileId={row.original.file_id}
				refreshFiles={refreshFiles}
				file_name={row.original.file_name}
			/>

          </div>
        ) : (
          <Button disabled variant="outline" size="sm">
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ),
    },
  ];


export function FilesTable({ status } : { status : any}) {

    const token = useSelector(selectToken);

    const { id } = useParams();

    const [files, setFiles] = useState<FileRecord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const refreshFiles = async () => {

        try {

            setIsLoading(true);
            setError(null);
            const data = await fileServices.getFilesByProject(parseInt(id ?? '0'), token);
            console.log(data)
            setFiles(data);

        } catch (err) {

            setError(err instanceof Error ? err.message : "An unknown error occurred");
            console.error("Error fetching projects:", err);

        } finally {

            setIsLoading(false);

        }

    };

    const columns = getColumns(refreshFiles,parseInt(id ? id : "1"));

    const table = useReactTable({
        data: files,
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


    useEffect(() => {
        refreshFiles();
    }, []);

    return (

        <div className="w-full rounded-lg shadow-lg p-4">

            <div className="flex items-center py-4 w-full">

                <Input
                    placeholder="Filter files..."
                    value={(table.getColumn("file_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("file_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />


                <UploadDataModal refreshFiles={refreshFiles} status={status}/>

            </div>

            <div className="rounded-md border">
                {isLoading ? (

                        <div className="flex justify-center items-center h-40">
                            <p>Loading Files...</p>
                        </div>

                    ) : error ? (

                        <div className="text-red-500 py-4">
                            Error: {error}. Please try again.
                        </div>

                    ) : (

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
                                {
                                    table.getRowModel().rows?.length ? (

                                        table.getRowModel().rows.map((row, index) => (

                                            <TableRow
                                                key={index}
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
                                                colSpan={Columns.length}
                                                className="h-24 text-center"
                                            >
                                            No results.
                                            </TableCell>

                                        </TableRow>
                                    )
                                }

                            </TableBody>

                        </Table>
                    )}

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
