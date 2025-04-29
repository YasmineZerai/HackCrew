import TeamRessources from "@/components/progress-tracker-components/teamRessources";
import TeamUpdates from "../../components/progress-tracker-components/teamUpdates";

export default function ProgressTracker() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4  bg-coll6-purple-100 ">
      <div className="min-h-[80vh] flex gap-2 rounded-xl  bg-muted/50 p-2">
        <TeamUpdates />
        <TeamRessources />
      </div>
    </div>
  );
}
