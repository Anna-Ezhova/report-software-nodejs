"use client";

import { REPORTS_DATA } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { User } from "@/payload-types";

interface UserData {
  userData: User;
}

const NavItems = ({ userData }: UserData) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);
  //useOnClickOutside(navRef, () => setActiveIndex(null))
  
  useOnClickOutside<HTMLUListElement>(
    //@ts-expect-error
    navRef as React.RefObject<HTMLUListElement>,
    () => setActiveIndex(null),
  );
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <>
      <div className="flex gap-4 h-full" ref={navRef}>
        <div className="flex gap-4 h-full">
          {" "}
          {REPORTS_DATA.map((category, i) => {
            const handleOpen = () => {
              if (activeIndex === i) {
                setActiveIndex(null);
              } else {
                setActiveIndex(i);
              }
            };

            const isOpen = i === activeIndex;

            return (
              <NavItem
                category={category}
                handleOpen={handleOpen}
                isOpen={isOpen}
                key={category.value}
                isAnyOpen={isAnyOpen}
                userData={userData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavItems;
