import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DeliveryOrderForm } from './order'
import Image from 'next/image';



export default function Page({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-25 shrink-0 items-center gap-2 border-b px-4 bg-white  text-2xl" >
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb >
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" >
                  Crear orden
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <div className="grid mt-14 mb-14">
            <h3 className="font-mona-sans text-(--color-primary-text-dark) font-bold text-2xl">Crea una orden</h3>
            <span className="text-(--color-primary-text-dark) mt-3">Dale una ventaja competitiva a tu negocio con entregas <span className="font-bold" >el mismo día </span> (Área Metropolitana) y <span className="font-bold">el día siguiente</span> a nivel nacional.</span>
            
          </div>
          <div className=" h-fit flex-1 rounded-xl md:min-h-min" >
          
          {/* <div className="flex items-center rounded-[8px] border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
    
      <Select defaultValue="503">
        <SelectTrigger
          className="w-[78px] px-3 py-2 border-r border-input rounded-[8px] focus:ring-0 focus:ring-offset-0"
        >
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="503">503</SelectItem>
          <SelectItem value="502">502</SelectItem>
          <SelectItem value="505">505</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="tel"
        placeholder="7777 7777"
        className="flex-1 border-0 px-3 py-2 rounded-r-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div> */}
          
        <DeliveryOrderForm/>
          
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
