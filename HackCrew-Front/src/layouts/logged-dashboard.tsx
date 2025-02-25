import AlertTeam from "@/components/header-Components/alert-team";
import { AppSidebar } from "@/components/sideBar-Components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function LoggedDasboard({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-coll5-purple-400 text-white">
          <div className="flex items-center  gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="w-full flex justify-end px-3 gap-2">
            <AlertTeam />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
