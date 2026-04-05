import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SocReportTemplate from "@/components/tables/SocReportTemplate";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getLatestReport } from "@/server/helperFunctions";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    const report = await getLatestReport("soc_generic", nextCookies);

    if (!report) return notFound();

    return (
      <>
        <Breadcrumbs
          department="SOC"
          currentPage="Letzter SOC Bericht"
        ></Breadcrumbs>
        <MaxWidthWrapper>
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
