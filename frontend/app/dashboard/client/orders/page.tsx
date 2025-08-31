// import DashboardLayout from '@/app/dashboard/dashboard-template';
// import { DeliveryOrderForm } from '../../order'
// import * as React from "react"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// const pageName = "Crea una orden";
// const breadcrumbTitle = "Crear orden";

// export default function OrderPage() {
//   return (
//     <DashboardLayout
//         pageName={pageName}
//         breadcrumbTitle={breadcrumbTitle}
//         subText={
//         <span>
//             Dale una ventaja competitiva a tu negocio con entregas <span className="font-bold" >el mismo día </span> (Área Metropolitana) y <span className="font-bold">el día siguiente</span> a nivel nacional.
//         </span>
//     }>
//         <DeliveryOrderForm/>
//     </DashboardLayout>
//   );
// }

//////////////
'use client';

import DashboardLayout from '@/app/dashboard/dashboard-template';
import { DeliveryOrderForm } from '../../order';
import * as React from 'react';
import PackageIcon from '@/public/package.svg';

import AddIcon from '@/public/add.svg';
import ArrowIcon from '@/public/arrow.svg';
import DeleteIcon from '@/public/delete.svg';
import ArrowLeft from '@/public/ArrowLeft.svg';

import { Button } from '@/components/ui/button';
import ArrowRightIcon from '@/components/customIcons/arrow.icon';
import Image from 'next/image';
import ProductDimensions from '@/components/orders/product-dimensions';

import AddProducts from '@/components/orders/add-products'

const pageName = 'Crea una orden';
const breadcrumbTitle = 'Crear orden';

export default function OrderPage() {
  
  return (
    <DashboardLayout
      pageName={pageName}
      breadcrumbTitle={breadcrumbTitle}
      subText={
        <span>
          Dale una ventaja competitiva a tu negocio con entregas{' '}
          <span className="font-bold">el mismo día </span> (Área Metropolitana)
          y <span className="font-bold">el día siguiente</span> a nivel
          nacional.
        </span>
      }
    >
      <AddProducts/>
    </DashboardLayout>
  );
}
