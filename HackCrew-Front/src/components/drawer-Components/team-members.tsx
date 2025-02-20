import { ScrollArea } from "@/components/ui/scroll-area";

import { useTeams } from "@/context/teams/useTeams";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamMembers() {
  const teamContext = useTeams();
  const members = teamContext.members;

  return (
    <ScrollArea className="h-72 w-1/4 rounded-md  bg-coll6-purple-300">
      <div className="py-4 px-1">
        <h4 className="mb-4 text-md leading-none text-center text-white">
          Your Team Members
        </h4>
        {members.map((member) => (
          <div className="flex items-center gap-2 py-1.5 text-left text-sm bg-coll6-purple-100 px-3 rounded-lg">
            <Avatar className="h-8 w-8 rounded-lg  bg-coll6-purple-100">
              <AvatarImage alt={member.firstName + " " + member.lastName} />
              <AvatarFallback className="rounded-lg uppercase">
                {member.firstName.charAt(0)}
                {member.lastName.charAt(0)}`
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold capitalize">
                {member.firstName + " " + member.lastName}
              </span>
              <span className="truncate text-xs">{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
