import { AppSidebar } from "@/components/sideBar-Components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTeams } from "@/context/teams/useTeams";
import { useUser } from "@/context/user/user";
import { useEffect } from "react";

export default function Home() {
  const teamContext = useTeams();
  const userContext = useUser();
  useEffect(() => {
    if (userContext.teams.length > 0) {
      teamContext.setActiveTeam(
        userContext.teams[userContext.teams.length - 1]
      );
    }
  }, [userContext.teams]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-coll5-purple-400 text-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    className="text-white hover:text-gray-500"
                  >
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Data Fetching
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-white ">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-muted/50" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
