"use client";

import { REPORTS_DATA } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown, DivideCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/payload-types";

type Category = (typeof REPORTS_DATA)[number];

interface NavItemProps {
  userData: User;
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  userData,
  category,
  isAnyOpen,
  handleOpen,
  isOpen,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        {userData.role === "user_general" && category.tag === "soc" ? (
          <Button
            className="hidden gap-1.5 text-base font-semibold text-slate-50 bg-asoftnet-700 hover:bg-asoftnet-600 hover:text-slate-50"
            onClick={handleOpen}
            variant={isOpen ? "default" : "ghost"}
          >
            {" "}
            {category.label}{" "}
            <ChevronDown
              className={cn("h-5 w-5 transition-all text-slate-50", {
                "-rotate-180": isOpen,
              })}
            />
          </Button>
        ) : (
          <Button
            className="gap-1.5 text-lg font-semibold text-slate-50 bg-asoftnet-700 hover:bg-asoftnet-600 hover:text-slate-50"
            onClick={handleOpen}
            variant={isOpen ? "default" : "ghost"}
          >
            {" "}
            {category.label}{" "}
            <ChevronDown
              className={cn("h-5 w-5 transition-all text-slate-50", {
                "-rotate-180": isOpen,
              })}
            />
          </Button>
        )}
      </div>

      {isOpen ? (
        <div
          className={cn("absolute inset-x-0 top-full text-muted-foreground", {
            "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
          })}
        >
          <div
            className="absolute inset-0 top-1/2 bg-slate-100 shadow"
            aria-hidden="true"
          />
          <div className="relative bg-slate-100">
            <div className="mx-auto max-w-5xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-7 gap-x-8">
                  {category.featured.map((item) => {
                    return (
                      <div
                        key={item!.name}
                        className="group relative text-base  sm:text-sm"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 group-hover:opacity-75">
                          <Link
                            href={item!.href}
                            className="mt-6 block font-semibold text-asoftnet-900 "
                          >
                            {" "}
                            <Image
                              src={item!.imageSrc}
                              alt={item!.name}
                              fill
                              className="object-cover object center"
                            />
                          </Link>
                        </div>

                        <Link
                          href={item!.href}
                          className="mt-6 block text-center font-semibold text-asoftnet-900 "
                        >
                          {item!.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
