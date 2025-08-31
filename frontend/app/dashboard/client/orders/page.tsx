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

const pageName = 'Crea una orden';
const breadcrumbTitle = 'Crear orden';

export default function OrderPage() {
  const handleDimensionsChange = (dimensions: {
    largo: string;
    alto: string;
    ancho: string;
  }) => {
    console.log('Dimensions changed:', dimensions);
    // Do something with the new values
  };
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
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Agrega tus productos
        </h2>

        <div className="">
          <div className="p-6 bg-[#F8F9FA] rounded-xl">
            <div className="flex items-center gap-[20px]">
              <div className="flex items-center justify-center w-[48px] h-[48px]">
                <Image src={PackageIcon} alt="package" width={30} height={31} />
              </div>
              {/* border border- rounded-lg bg-white px-2 py-2 */}

              <ProductDimensions onChange={handleDimensionsChange} />
              <div className="flex flex-col ml-[20px] w-[130px]">
                <label className="text-sm font-bold text-foreground mb-1">
                  Peso en libras
                </label>
                <input
                  type="text"
                  className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                  placeholder="3 libras"
                />
              </div>

              <div className="flex flex-col ml-[20px] flex-1">
                <label className="text-sm font-bold text-foreground mb-1">
                  Contenido
                </label>
                <input
                  type="text"
                  className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                  placeholder="iPhone 14 pro Max"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="custom-btn-secondary ">
                Agregar{' '}
                <Image src={AddIcon} alt="package" width={24} height={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" className="custom-btn-secondary">
            <Image src={ArrowLeft} alt="Regresar" width={24} height={24} />
            Regresar
          </Button>
          <Button className=" text-white px-1 py-2 custom-btn-primary">
            <span className="px-3">Enviar</span>{' '}
            <ArrowRightIcon className="custom-icon" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
