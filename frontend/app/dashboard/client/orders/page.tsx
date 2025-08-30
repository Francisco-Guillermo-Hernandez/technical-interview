import DashboardLayout from '@/app/dashboard/dashboard-template';
import { DeliveryOrderForm } from '../../order'
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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


const pageName = "Crea una orden";
const breadcrumbTitle = "Crear orden";

export default function OrderPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
    <DashboardLayout 
        pageName={pageName} 
        breadcrumbTitle={breadcrumbTitle}
        subText={
        <span>
            Dale una ventaja competitiva a tu negocio con entregas <span className="font-bold" >el mismo día </span> (Área Metropolitana) y <span className="font-bold">el día siguiente</span> a nivel nacional.
        </span>
    }>
        <DeliveryOrderForm/>
    </DashboardLayout>
    </>
  );
}