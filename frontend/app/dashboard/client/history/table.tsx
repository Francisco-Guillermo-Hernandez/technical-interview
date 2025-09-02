"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge"


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import env from '@/lib/env-config';

import { type DeliveryRequest } from '@/components/orders/create-order';
import { type Product } from '@/components/orders/add-products';

import axios from 'axios';
import useDownloadOrders from '@/hooks/download-report';
import FiltersPage, { type Filter } from '@/app/dashboard/client/history/filters';
import { DateRange } from 'react-day-picker'
import { PaginationState, OnChangeFn } from '@tanstack/react-table';
import { format } from 'date-fns';

type Package = {
  length: number;
  height: number;
  width: number;
  weight: number;
  content: string;
};

type KeysToOmit = 'countryCode';
type Order = Omit<DeliveryRequest, KeysToOmit> & {
  _id: string;
  packages: Array<Package>;
  createdAt: string;
  thirdLevel: string | null;
};

interface OrderPaginator {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

type PaginatorRequest = {
  page: number;
  limit: number;
}


const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export default function HistoryPage({ token }: { token: string }) {

  const [orders, setOrders] = React.useState<OrderPaginator>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [httpError, setError] = React.useState<string | null>(null);
  const {error, downloadOrdersAsXLSX } = useDownloadOrders();

  const fetchOrders = async (
    token: string, 
    paginator: PaginatorRequest = { page: 0, limit: 5 }, 
    filter?: Filter
  ) => {
    try {
      setLoading(true);
      setError(null);

      const { from, to } = filter?.range || {};
      const filtersTemplate = (from && to) ? 
      `&from=${formatDate(from)}&to=${formatDate(to)}` : '';
      
      const response = await axios.get<OrderPaginator>(
        `${env.apiUrl}delivery/orders?page=${paginator.page + 1}${filtersTemplate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');

      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  
  React.useEffect(() => {
   fetchOrders(token);  
  }, [token]);

  const [pagination, setPagination] = React.useState({
  pageIndex: 0,
  pageSize: 5,
});

  const handlePageChange = (value: number) => {
    fetchOrders(token, {
      limit: 5, 
      page: pagination.pageIndex + value
    });
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "No. de Orden",
    cell: ({ row }) => (
      <div className="capitalize font-bold">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: 'Nombre',
    cell: ({ row }) => <div className="lowercase">{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: 'Apellidos',
    cell: ({ row }) => <div className="lowercase">{row.getValue("lastName")}</div>,
  },
    {
    accessorKey: "firstLevel",
    header: 'Departamento',
    cell: ({ row }) => <div className="lowercase">{row.getValue("firstLevel")}</div>,
  },

  {
    accessorKey: "secondLevel",
    header: 'Municipio',
    cell: ({ row }) => <div className="lowercase">{row.getValue("secondLevel")}</div>,
  },
  {
    accessorKey: "packages",
    header: () => <div className="text-right">Paquetes en orden</div>,
    cell: ({ row }) => {


      const numberOfPackages = row.getValue("packages") as Array<Package>
      return <div className=" text-right font-medium">  <Badge variant={'outline'} className="border-0 bg-[#EFFDF4] text-[#73BD28]">{numberOfPackages.length}</Badge></div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              ver detalles 
            </DropdownMenuItem>
            <DropdownMenuSeparator />
   
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


  const table = useReactTable({
    data: orders?.orders ?? [], 
    columns,
    pageCount: orders?.totalPages,
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
      pagination: pagination
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: orders?.total
  });

  const downloadReport = () => downloadOrdersAsXLSX(orders?.orders ?? [], 'my-orders.xlsx');

  const applyFilters = (filter: Filter) => {
    console.log('Hiiiii')
    fetchOrders(token, {
      limit: 5, 
      page: pagination.pageIndex
    }, filter);
  }

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
      </div> */}
      <FiltersPage 
      downloadOrdersCallback={downloadReport} 
      applyFiltersCallBack={applyFilters} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-[#EDEDED] text-[#3B3939]">
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
          <TableBody className="bg-white">
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
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => {
              table.previousPage()
              handlePageChange(-1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => {
              table.nextPage()
              handlePageChange(+1)
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
