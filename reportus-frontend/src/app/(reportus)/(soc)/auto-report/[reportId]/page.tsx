import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AlertTable from "@/components/auto-report/AlertTable";
import AutoReportTemplate from "@/components/auto-report/AutoReportTemplate";
import SocReportTemplate from "@/components/tables/SocReportTemplate";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

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

    return <AutoReportTemplate reportId={reportId} />;
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
