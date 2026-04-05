import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MeetingProtocolForm from "@/components/forms/MeetingProtocolForm";
import SocVisitorForm from "@/components/forms/SocVisitorForm";
import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);
  const token = nextCookies.get("payload-token")?.value;

  if (user && (user.role === "manager_general" || user.role === "admin")) {
    return (
      <>
        <Breadcrumbs
          department="Meetingsberichte"
          currentPage="Berichte erstellen"
        ></Breadcrumbs>
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <div className="grid gap-6 ">
              <MeetingProtocolForm
                user={user}
                //@ts-ignore
                token={token}
              ></MeetingProtocolForm>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
