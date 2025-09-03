"use client"

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
import { useEffect, useState } from 'react';

export default function DashboardLayout({

  children, pageName, subText, breadcrumbTitle
}: { subText: React.ReactNode, children: React.ReactNode, pageName: string, breadcrumbTitle: string }) {

  const [pageTitle, setPageTitle] = useState('Dashboard')

  useEffect(() => {
    document.title = pageName
    setPageTitle(pageName)
  }, [pageName])


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
                  {breadcrumbTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <div className="grid mt-14 mb-14">
            <h3 className="font-mona-sans text-(--color-primary-text-dark) font-bold text-2xl">{pageName}</h3>
            <span className="text-(--color-primary-text-dark) mt-3">{subText}</span>
            
          </div>
          <div className=" h-fit flex-1 rounded-xl md:min-h-min" >
        
            {children}
          
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
