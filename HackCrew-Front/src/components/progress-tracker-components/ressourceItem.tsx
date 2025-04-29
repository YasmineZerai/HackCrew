import { useUser } from "@/context/user/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { FileText, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAndOpenFile } from "@/api/ressources/get-file";

export default function RessourceItem({ ressource }: { ressource: any }) {
  const userContext = useUser();
  const [userInitials, setUserInitials] = useState("");
  const isLink = !!ressource.link;
  const isFile = !!ressource.path;

  useEffect(() => {
    const fetchUser = async () => {
      const [response] = await userContext.getUserById(ressource.userId);
      if (response?.payload?.user) {
        const { firstName, lastName } = response.payload.user;
        setUserInitials(`${firstName[0]}${lastName[0]}`);
      }
    };

    fetchUser();
  }, [ressource.userId, userContext]);

  const handleFileClick = async () => {
    if (!ressource.path) return;

    try {
      const filename = ressource.path.split("/").pop();

      // Option 1: Just open the file
      await getAndOpenFile(filename);

      // Option 2: Get the blob and do something with it first
      /*
      const [blob, error] = await getFileBlob(filename);
      if (blob) {
        // You can process the blob here if needed
        await openFileFromResponse(blob, filename);
      } else {
        console.error('Error:', error);
      }
      */
    } catch (error) {
      console.error("Failed to open file:", error);
      // Show error to user
    }
  };

  const handleLinkClick = () => {
    if (isLink) {
      window.open(ressource.link, "_blank");
    }
  };
  const handlePreview = () => {
    if (isLink) {
      // Open preview modal or show embedded content
      window.open(
        `/preview?url=${encodeURIComponent(ressource.link)}`,
        "_blank"
      );
    } else if (isFile) {
      // Open file preview
      window.open(`/preview?file=${ressource.path}`, "_blank");
    }
  };

  return (
    <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
      <div className="flex flex-col">
        <div className="flex flex-col gap-0.5  ">
          <p className="text-md font-medium leading-none truncate capitalize">
            Ressource Title
          </p>
          <p className="text-sm text-muted-foreground ">
            {ressource.description
              ? ressource.description
              : "ressource description"}
          </p>
        </div>

        <div className="flex items-center space-x-3 pt-4">
          <Button
            className="p-3 rounded-lg bg-coll6-purple-100 text-coll6-purple-500"
            onClick={handleFileClick}
          >
            <FileText className="h-3 w-3" />
          </Button>
          <Button className="p-3 rounded-lg bg-coll6-purple-100 text-coll6-purple-500">
            <Link2 className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-900"
            onClick={() => {
              if (isLink) window.open(ressource.link, "_blank");
            }}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            {isLink ? "Open" : "Preview"}
          </Button>
        </div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-coll6-purple-100 uppercase text-md">
          {userInitials || "US"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
