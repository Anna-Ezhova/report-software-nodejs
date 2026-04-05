import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewChangeForm from "@/components/forms/NewChangeForm";

import { getServerSideUser } from "@/lib/user-cookies";
import { User } from "@/payload-types";

import { cookies } from "next/headers";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (user) {
    const userObject = user as User;
    const username = userObject.username;

    return (
      <>
        <Breadcrumbs
          department="Forms"
          currentPage="Neuer Change"
        ></Breadcrumbs>
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px]">
            <div className="grid gap-6 ">
              <NewChangeForm user={username} />
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
