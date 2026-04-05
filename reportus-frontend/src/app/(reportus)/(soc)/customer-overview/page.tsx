import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomerInfoField from "@/components/customers/CustomerInfoField";
import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";

import { getAllCustomers } from "@/server/helperFunctions";

const Page = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    const customers = await getAllCustomers(nextCookies);

    return (
      <>
        <Breadcrumbs
          department="SOC-Wiki"
          currentPage="Kundenübersicht"
        ></Breadcrumbs>
        <MaxWidthWrapper>
          <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 ">
            {
              //@ts-ignore
              customers.map((id) => (
                <div
                  key={id.id}
                  className=" mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[800px] bg-asoftnet-200 p-3 m-5 rounded-md"
                >
                  {id.contact ? (
                    <CustomerInfoField
                      customerId={id.id}
                      name={id.name}
                      contact={id.contact[0]}
                    ></CustomerInfoField>
                  ) : (
                    <CustomerInfoField
                      customerId={id.id}
                      name={id.name}
                    ></CustomerInfoField>
                  )}
                </div>
              ))
            }
          </div>
        </MaxWidthWrapper>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
