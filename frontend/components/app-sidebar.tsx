import * as React from "react"

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "MENÚ",
      url: "#",
      items: [
        {
          icon: "/plus.svg",
          title: "Crear orden",
          url: "/order/create",
          isActive: true
        },
        {
          icon: "/history.svg",
          title: "Historial",
          url: "/order/history",
        },
      ],
    },
 
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="ml-10 mt-10 mr-10">
         <SidebarMenu>
          <SidebarMenuItem>
            <Image 
                  src="/Logo.svg" 
                  alt="Logo"
                  width={163.05}
                  height={40}
                  layout="intrinsic"
                />  
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="ml-10 mr-10">
   
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} >
            <SidebarGroupLabel className="font-black mt-8 mb-8">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={item.isActive} className="h-[72px] w-[260px] p-8">
                      <a href={item.url}>  
                        <Image 
                          src={item.icon} 
                          alt="icon"
                          width={24}
                          height={24}
                          layout="intrinsic"
                        /> 
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
