import { Check, Link2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeams } from "@/context/teams/useTeams";
import RessourceItem from "./ressourceItem";

export default function TeamRessources() {
  const teamContext = useTeams();
  return (
    <Card className={cn("w-1/3 h-max")}>
      <CardHeader>
        <CardTitle className="text-2xl">Team Ressources</CardTitle>
        <CardDescription className="flex gap-1">
          <Link2 />
          Share ressources accross the team
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {teamContext.teamRessources.length === 0
          ? "no ressources yet"
          : [...teamContext.teamRessources]
              .reverse()
              .map((ressource) => (
                <RessourceItem key={ressource._id} ressource={ressource} />
              ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Plus />
          Add a new ressource
        </Button>
      </CardFooter>
    </Card>
  );
}
