import { ComponentProps, PropsWithChildren, useState } from "react";
import { CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function ExistingTeamCode(args: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("ABCDEFG");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 w-1/4">
      <CardTitle className="text-center text-white">
        Copy The Team Code And Share It To Invite Your Friends !
      </CardTitle>
      <div
        className=" w-11/12 h-50 p-1
 flex flex-col justify-center items-center bg-coll6-purple-300 rounded-md text-white relative "
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 absolute top-2 right-2"
          onClick={handleCopy}
        >
          {copied ? (
            <ClipboardCheck className="size-4 text-green-400" />
          ) : (
            <Clipboard className="size-4" />
          )}
          {copied ? "Copied!" : ""}
        </Button>
        <pre className=" text-5xl text-coll6-purple-100">{args.code}</pre>
      </div>
    </div>
  );
}
