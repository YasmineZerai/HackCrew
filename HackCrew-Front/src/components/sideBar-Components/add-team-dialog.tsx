import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateTeamCard from "./create-team-card";
import JoinTeamCard from "./join-team-card";
export default function AddTeamDialog() {
  return (
    <DialogContent className="dark sm:max-w-[425px]">
      <Tabs defaultValue="new">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Create a new Team</TabsTrigger>
          <TabsTrigger value="existing">Join an existing Team</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="text-white">
          <CreateTeamCard />
        </TabsContent>
        <TabsContent value="existing" className="text-white">
          <JoinTeamCard />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
