import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomerTab from "@/components/customers/CustomerTab";
import CustomerTable from "@/components/customers/CustomerTable";

import { getServerSideUser } from "@/lib/user-cookies";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDocById } from "@/server/helperFunctions";

interface PageProps {
  params: Promise<{
    customer: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  const BREADCRUMBS = [
    { id: 1, name: "Homepage", href: "/" },
    { id: 2, name: "SOC-Wiki", href: "#" },
    { id: 3, name: "Kundenübersicht", href: "/customer-overview" },
  ];

  if (
    user &&
    (user.role === "user_soc" ||
      user.role === "manager_soc" ||
      user.role === "admin")
  ) {
    const { customer } = await params;

    const customerData = await getDocById("customers", customer, nextCookies);

    if (!customerData) return notFound();

    return (
      <>
        <Breadcrumbs
          BREADCRUMBS={BREADCRUMBS}
          currentPage={customerData.name}
        ></Breadcrumbs>
        <MaxWidthWrapper className="flex columns-2 justify-center">
          <section className="w-1/3">
            <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 p-4">
              <div className="bg-asoftnet-50 rounded-md p-4 mr-8">
                <CustomerTable customerId={customer}></CustomerTable>
              </div>
            </div>
          </section>
          <section className="border-l border-slate-200 bg-slate-50 w-2/3">
            <div className="bg-slate-100 rounded-md p-4">
              <CustomerTab customerId={customer}></CustomerTab>
            </div>
          </section>
        </MaxWidthWrapper>
      </>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
