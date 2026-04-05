import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import Last5Alarms from "@/components/Last5Alarms";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomerInfoField from "@/components/customers/CustomerInfoField";
import CustomerTable from "@/components/customers/CustomerTable";

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
        <Breadcrumbs department="SOC" currentPage="Letzte Alarme"></Breadcrumbs>
        <MaxWidthWrapper>
          <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 ">
            {
              //@ts-expect-error
              customers.map((id) => (
                <div key={id.id} className="flex columns-2 justify-center mb-8">
                  <div className=" mx-auto flex w-full flex-col justify-start space-y-6 sm:w-[700px] sm:h-[570px] bg-asoftnet-200 p-3 mr-5 rounded-md">
                    {id.contact ? (
                      <CustomerTable customerId={id.id}></CustomerTable>
                    ) : (
                      <CustomerInfoField
                        customerId={id.id}
                        name={id.name}
                      ></CustomerInfoField>
                    )}
                  </div>

                  <div className="ml-5 sm:w-[850px]">
                    {" "}
                    <Last5Alarms id={id.id}></Last5Alarms>
                  </div>
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
