import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

import AutoReportFrame from "@/components/auto-report/AutoReportFrame";
import { getDocById } from "@/server/helperFunctions";

interface PageProps {
  params: Promise<{
    alarmId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);
  const token = nextCookies.get("payload-token")?.value;

  const { alarmId } = await params;

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    const alarm = await getDocById("external_alerts", alarmId, nextCookies);

    // if (!alarm) return notFound()

    return (
      <>
        <Breadcrumbs currentPage="Neuer Alarm" department="SOC"></Breadcrumbs>
        <MaxWidthWrapper className="flex columns-2 justify-center">
          <AutoReportFrame
            alarm={alarm}
            mode="lvl2"
            token={token}
          ></AutoReportFrame>
        </MaxWidthWrapper>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
