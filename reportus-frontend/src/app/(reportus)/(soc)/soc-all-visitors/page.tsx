import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DataTable } from "@/components/tables/DataTable";
import { columnsSocVisitor } from "@/components/tables/column-data";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";
import { getAllReports } from "@/server/helperFunctions";


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
    const data = await getAllReports("soc_visitors", token);

    return (
      <div>
        <Breadcrumbs
          department="SOC"
          currentPage="Alle Besucherprotokolle"
        ></Breadcrumbs>

        {/* <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="relative ml-auto flex-1 md:grow-0">

            
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
                </div> */}
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
          <DataTable columns={columnsSocVisitor} data={data}></DataTable>
        </div>
      </div>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
