import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { getServerSideUser } from "@/lib/user-cookies";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);
  const token = nextCookies.get("payload-token")?.value;

  return (
    <div className="bg-sky-400 sticky z-50 top-0 inset-x-0 h-20">
      <header className="relative bg-sky-400">
        <MaxWidthWrapper className="bg-asoftnet-700">
          <div className="border-b border-slate-100">
            <div className="flex h-20 items-center">
              {/* MOBILE MENU */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    src="/logo_asoftnetweiss.webp"
                    alt="logo"
                    height="100"
                    width="100"
                  />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                {user ? <NavItems userData={user} /> : null}
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user &&
                  (user.role === "admin" ||
                    user.role === "manager_soc" ||
                    user.role === "user_soc") ? (
                    <Link
                      href="/latest-alarms"
                      className={cn(
                        "text-asoftnet-700 font-bold",
                        buttonVariants({ variant: "outline" }),
                      )}
                    >
                      SOC Alarmübersicht
                    </Link>
                  ) : null}
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={cn(
                        "text-slate-100 font-semibold",
                        buttonVariants({ variant: "ghost" }),
                      )}
                    >
                      Einloggen
                    </Link>
                  )}

                  {/* {
                            user ? null : <span className="h-6 w-px bg-slate-200" aria-hidden= "true"></span>
                        } */}

                  {
                    user ? <UserAccountNav user={user} token={token} /> : null
                    // <Link href="/sign-up" className={cn( "text-slate-100 font-semibold", buttonVariants({variant: "ghost"}))}>Account Erstellen</Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
