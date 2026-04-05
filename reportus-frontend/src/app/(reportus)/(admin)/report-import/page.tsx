import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import BcixAlertForm from "@/components/forms/BcixAlertForm";
import ImportReport from "@/components/forms/ImportReport";
import SocGeneralForm from "@/components/forms/SocGeneralForm";
import SocVisitorForm from "@/components/forms/SocVisitorForm";
import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (user && user.role === "admin") {
    return (
      <>
        {" "}
        <Breadcrumbs
          department="Admin"
          currentPage="Berichte importieren"
        ></Breadcrumbs>
        <div className="container relative flex pt-10 flex-col =({s-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <div className="grid gap-6 ">
              <ImportReport></ImportReport>
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
