import { LoaderCircle, Settings2 } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTeams } from "@/context/teams/useTeams";
import AddMember from "./add-member";
import { TeamCode } from "./team-code";
import { getTeamCodeApi } from "@/api/teams/get-team-code";
import { Separator } from "../ui/separator";
import { useState } from "react";
export default function ManageTeamButton() {
  const teamContext = useTeams();
  const [readyToRender, setIsReadyToRender] = useState(false);
  const handleClick = async () => {
    if (!teamContext.hasCode) {
      const [response, error] = await teamContext.getTeamCode(
        teamContext.activeTeam._id
      );
      if (response.payload) {
        teamContext.setHasCode(true);
        teamContext.setTeamCode(response.payload.existingTeamCode.code);
      }
    }
    setIsReadyToRender(true);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <SidebarMenuButton
          className="hover:bg-coll5-purple-400 text-gray-500"
          size="sm"
          onClick={handleClick}
        >
          <Settings2 />
          <span className="truncate font-semibold capitalize">Manage Team</span>
        </SidebarMenuButton>
      </DrawerTrigger>
      <DrawerContent className="bg-coll6-purple-200 flex flex-col justify-center items-center ">
        <DrawerHeader className="text-coll6-purple-300 mb-5">
          <DrawerTitle className="capitalize text-2xl">
            Manage Your Team : {teamContext.activeTeam.teamName}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-around items-center w-full h-60">
          <AddMember />
          <Separator orientation="vertical" />
          {readyToRender ? (
            <TeamCode />
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
          <Separator orientation="vertical" />
          <div className="h-5 w-5 bg-coll1-blue"></div>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
