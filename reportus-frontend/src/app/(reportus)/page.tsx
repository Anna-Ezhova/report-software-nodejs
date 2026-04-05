import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SocReportTemplate from "@/components/tables/SocReportTemplate";
import { buttonVariants } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/user-cookies";
import { ArrowRight, Divide, Frown } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLatestReport, getDocById } from "@/server/helperFunctions";

export default async function Home() {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (user) {
    const report = await getLatestReport("soc_generic", nextCookies);

    return (
      <>
        <MaxWidthWrapper className="flex columns-2 justify-center">
          <section className="w-1/2">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl  justify-center">
              {/* Statt Name - name des Users,
        Statt SOC-Mitarbeiter - Rolle */}
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Hallo,{" "}
                <span className="text-asoftnet-700">{`${user?.first_name} ${user?.last_name}`}</span>
                !
              </h1>

              <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                Du bist ein{" "}
                <span className="text-asoftnet-800">
                  {user.role === "user_soc" || user.role === "manager_soc"
                    ? "SOC mitarbeiter."
                    : null}
                  {user.role === "admin" ? "Admin" : null}
                  {user.role === "user_general" ? "Mitarbeiter" : null}
                  {user.role === "manager_general"
                    ? "Verwaltungsmitarbeiter"
                    : null}
                </span>{" "}
              </p>
              <p className="mt-6 text-lg max-w-prose text-muted-foreground">
                {user.role === "user_soc" || user.role === "manager_soc"
                  ? "Du kannst alle Funktionen des SOC-Menüs nutzen"
                  : null}
                {user.role === "admin"
                  ? "Du kannst alle Funktionen des SOC-Menüs nutzen und neue User erstellen. "
                  : null}
                {user.role === "user_general"
                  ? "Du kannst Weekly Meetings Protokolle einsehen"
                  : null}
                {user.role === "manager_general"
                  ? "Du kannst Weekly- und Verwaltungsmeetings Protokolle erstellen, einsehen und bearbeiten. Ausßerdem ist Postausgangsformular verfügbar"
                  : null}
              </p>
            </div>
          </section>
          <section className="w-1/2 border-l border-slate-200 ">
            <div className="grid grid-cols-1 pt-4">
              {user.role != "user_general" && user.role != "manager_general" ? (
                <>
                  <h3 className="text-xl font-semibold text-center">
                    Letzter Ereignisbericht:
                  </h3>
                  {report ? (
                    <SocReportTemplate
                      date={report.date}
                      lead={report.lead}
                      employees={report.employees}
                      shift={report.shift}
                      events={report.events}
                      special_events={report.special_events}
                    ></SocReportTemplate>
                  ) : (
                    <div className="h-96 flex items-center justify-center">
                      <p className="pt-4 font-semibold text-center">
                        Keine Berichte Vorhanden
                      </p>
                    </div>
                  )}{" "}
                </>
              ) : null}

              {user.role === "manager_general" ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <Link
                    href="/latest-meeting?type=weekly"
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-1.5 text-xl",
                    })}
                  >
                    Zum letzten Meetingsprotokoll{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/latest-meeting?type=management"
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-1.5 text-xl",
                    })}
                  >
                    Zum letzten Verwaltungsprotokoll{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : null}

              {user.role === "user_general" ? (
                <div className="h-96 flex flex-col items-center justify-center">
                  <Link
                    href="/latest-meeting?type=weekly"
                    className={buttonVariants({
                      variant: "link",
                      className: "gap-1.5 text-xl",
                    })}
                  >
                    Zum letzten Meetingsprotokoll{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          </section>
        </MaxWidthWrapper>
        {/* <section className="border-t border-slate-200 bg-slate-50">
    <MaxWidthWrapper className="py-20">
      
    </MaxWidthWrapper>
      
          </section> */}
      </>
    );
  } else {
    return redirect("/sign-in");
  }
}
