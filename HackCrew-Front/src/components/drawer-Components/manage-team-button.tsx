import { Settings2 } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTeams } from "@/context/teams/useTeams";
import AddMember from "./add-member";
export default function ManageTeamButton() {
  const teamContext = useTeams();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <SidebarMenuButton
          className="hover:bg-coll5-purple-400 text-gray-500"
          size="sm"
        >
          <Settings2 />
          <span className="truncate font-semibold capitalize">Manage Team</span>
        </SidebarMenuButton>
      </DrawerTrigger>
      <DrawerContent className="bg-coll6-purple-200 flex flex-col justify-center items-center ">
        <DrawerHeader className="text-coll6-purple-300">
          <DrawerTitle className="capitalize text-2xl">
            Manage Your Team : {teamContext.activeTeam.teamName}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-around items-center w-full">
          <AddMember />
          <div className="h-5 w-5 bg-coll1-blue"></div>
          <div className="h-5 w-5 bg-coll1-blue"></div>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
