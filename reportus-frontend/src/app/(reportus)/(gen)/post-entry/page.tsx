import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostForm from "@/components/forms/PostForm";
import SocVisitorForm from "@/components/forms/SocVisitorForm";
import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

const Page = async () => {
  const nextCookies = await cookies();
  const token = nextCookies.get("payload-token")?.value;
  const { user } = await getServerSideUser(nextCookies);

  if (user && (user.role === "manager_general" || user.role === "admin")) {
    return (
      <>
        <Breadcrumbs
          department="Verwaltung"
          currentPage="Postausgangsform"
        ></Breadcrumbs>
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <div className="grid gap-6 ">
              <PostForm
                //@ts-ignore
                token={token}
              ></PostForm>
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
