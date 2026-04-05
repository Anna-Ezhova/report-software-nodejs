import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import BcixAlertForm from "@/components/forms/BcixAlertForm";
import SocGeneralForm from "@/components/forms/SocGeneralForm";
import SocVisitorForm from "@/components/forms/SocVisitorForm";
import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);
  const token = nextCookies.get("payload-token")?.value;

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    return (
      <>
        {" "}
        <Breadcrumbs department="SOC" currentPage="Alarm BCIX"></Breadcrumbs>
        <div className="container relative flex pt-10 flex-col =({s-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <div className="grid gap-6 ">
              <BcixAlertForm
                user={user} //@ts-ignore
                token={token}
              />
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
