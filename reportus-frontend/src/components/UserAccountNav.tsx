"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { User } from "@/payload-types";

import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/hooks/use-auth";

interface userAccNav {
  user: User;
  token: string | undefined;
}

const UserAccountNav = ({ user, token }: userAccNav) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          variant="ghost"
          className="relative font-semibold text-slate-100 text-lg"
        >
          Mein Account <ChevronDown />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-200 w-80 z-50" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none p-5">
            <p className="font-meduim text-sm text-black">{user.email}</p>
            <p className="font-meduim text-sm text-black">{user.username}</p>
            <p className="font-meduim text-sm text-black">{`${user.first_name} ${user.last_name}`}</p>
            <p className="font-meduim text-sm text-black">
              <a href="/admin/account">Bearbeiten</a>
            </p>
          </div>

          <div className="flex flex-col pl-10">
            {
             
              user.avatar ? (
                <Image
                  className="rounded-full"
                  width="75"
                  height="75" 
                  //@ts-expect-error
                  src={user.avatar.url}
                  alt="avatar"
                ></Image>
              ) : (
                <Image
                  className="rounded-full"
                  width="75"
                  height="75"
                  src="/dummy_user.png"
                  alt="avatar"
                ></Image>
              )
            }
          </div>
        </div>

        <DropdownMenuSeparator />
        {user.role === "admin" ? (
          <DropdownMenuItem className="pl-5" asChild>
            <Link href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin`}>
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuSeparator />

        {user.role === "admin" ? (
          <DropdownMenuItem className="pl-5" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users/create`}
            >
              Neuen User Anlegen
            </Link>
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuSeparator />

        {/* {user.role === "admin" ? <DropdownMenuItem  className="pl-5" asChild>
                    <Link href="/report-import">Berichte Importieren</Link>
                </DropdownMenuItem> : null}

                <DropdownMenuSeparator/> */}

        <DropdownMenuItem
          className="cursor-pointer pl-5 pb-2"
          onClick={() => {
            signOut(token);
          }}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
