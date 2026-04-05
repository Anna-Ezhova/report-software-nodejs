import { ArrowRight, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/user-cookies";

const AccessDenied = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />

        <h3 className="font-semibold text-2xl">
          {" "}
          Zugriff wird nicht gestattet
        </h3>

        <p className="text-muted-foreground text-sm">
          {!user
            ? "Sie sind nicht eingeloggt oder nicht berechtigt diese Seite zu sehen"
            : "Sie sind nicht berechtigt diese Seite zu sehen"}
        </p>

        {!user ? (
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Einloggen <ArrowRight className="w-4 h-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default AccessDenied;
