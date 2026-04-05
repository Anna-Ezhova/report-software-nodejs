import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SocReportTemplate from "@/components/tables/SocReportTemplate";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDocById } from "@/server/helperFunctions";

interface PageProps {
  params: Promise<{
    reportId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    const { reportId } = await params;

    const report = await getDocById("soc_generic", reportId, nextCookies);

    const BREADCRUMBS = [
      { id: 1, name: "Homepage", href: "/" },
      { id: 2, name: "SOC", href: "#" },
      { id: 3, name: "Alle Berichte", href: "/soc-all-reports" },
    ];

    if (!report) return notFound();

    return (
      <>
        <Breadcrumbs
          BREADCRUMBS={BREADCRUMBS}
          currentPage="Bericht Anzeigen"
        ></Breadcrumbs>
        <MaxWidthWrapper>
          <div></div>

          <SocReportTemplate
            date={report.date}
            lead={report.lead}
            employees={report.employees}
            shift={report.shift}
            events={report.events}
            special_events={report.special_events}
          ></SocReportTemplate>
        </MaxWidthWrapper>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
