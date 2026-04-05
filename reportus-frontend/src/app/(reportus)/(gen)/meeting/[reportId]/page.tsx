import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MeetingReport from "@/components/MeetingReport";
import MeetingProtocolEdit from "@/components/forms/MeetingProtocolEdit";

import { getServerSideUser } from "@/lib/user-cookies";
import { User } from "@/payload-types";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDocById } from "@/server/helperFunctions";

interface PageProps {
  params: Promise<{
    reportId: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

interface payloadQuery {
  collection: "meeting_protocols" | "management_protocols";
  depth: 1;
  limit: 1;
  where: {
    id: { equals: string };
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);
  const token = nextCookies.get("payload-token")?.value;

  const { protocolType } = await searchParams;

  if (
    user &&
    (protocolType === "weekly" ||
      (protocolType === "management" && user.role === "manager_general") ||
      user.role === "admin")
  ) {
    const { reportId } = await params;

    var collection = "meeting_protocols";
    var topic = "weekly";
    switch (protocolType) {
      case "management":
        collection = "management_protocols";
        topic = "verwaltung";
        break;

      default:
        break;
    }

    const report = await getDocById(collection, reportId, nextCookies);

    const tasks = report.tasks;

    const user = report.organizer as User;

    const userName = `${user.first_name} ${user.last_name}`;

    const BREADCRUMBS = [
      { id: 1, name: "Homepage", href: "/" },
      { id: 2, name: "Meetingsberichte", href: "#" },
      { id: 3, name: "Alle Berichte", href: "/meeting-show-all" },
    ];

    if (!report) return notFound();

    return (
      <>
        <Breadcrumbs
          BREADCRUMBS={BREADCRUMBS}
          currentPage="Bericht Anzeigen"
        ></Breadcrumbs>
        <MaxWidthWrapper className="flex pt-5  justify-center">
          <div>
            <MeetingReport
              organizer={userName}
              date={report.date}
              location={report.location}
              start_time={report.start_time}
              end_time={report.end_time}
              participants_intern={report.participants_intern}
              participants_extern={report.participants_extern}
              topic={report.topic}
              notes={report.notes}
            ></MeetingReport>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="flex columns-2 justify-center">
          <MeetingProtocolEdit
            id={reportId}
            //@ts-ignore
            type={topic}
            //@ts-ignore
            existingTasks={tasks}
            //@ts-ignore
            token={token}
          ></MeetingProtocolEdit>
        </MaxWidthWrapper>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
