import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="relative mb-4 h-80 w-60 text-muted-foreground">
            <Image src="/AS_mascot_160707_Web.webp" fill alt="rex" />
          </div>

          <h3 className="font-semibold text-2xl">
            {" "}
            Diese Seite existiert noch nicht
          </h3>
          <p className="text-muted-foreground text-center">
            Bitte auf neue Updates warten
          </p>
          <Link
            href="/"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Zurück zum Homepage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
