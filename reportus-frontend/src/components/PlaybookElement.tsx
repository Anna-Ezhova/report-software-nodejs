"use client";
import { cn } from "@/lib/utils";
import { BookText } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlaybookData {
  name: string;
  href: string;
  className?: string;
}

const PlaybookElement = ({
  name,
  href,
  className = "bg-asoftnet-200 hover:bg-asoftnet-300 text-asoftnet-950",
}: PlaybookData) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`${href}`);
      }}
      className={cn(
        " mx-auto flex w-full flex-col justify-center space-y-6 p-4  rounded-md cursor-pointer",
        className,
      )}
    >
      <div className="text-2xl flex flex-row justify-between w-full ">
        <BookText size={36} /> <p className="font-semibold ">{name}</p>
      </div>
    </div>
  );
};

export default PlaybookElement;
