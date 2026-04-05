import AccessDenied from "@/components/AccessDenied";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DataTable } from "@/components/tables/DataTable";
import { columnsSocReports } from "@/components/tables/column-data";

import { getServerSideUser } from "@/lib/user-cookies";

import { cookies } from "next/headers";
import { getAllReports } from "@/server/helperFunctions";
import SearchField from "@/components/search/SearchField";
import { TextField } from "@mui/material";

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
      <div>

					


        <Breadcrumbs department="SOC" currentPage="Alle Berichte"></Breadcrumbs>
				
         
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
					<SearchField token={token}></SearchField>
            
        </div>
      </div>
    );
  } else {
    return <AccessDenied></AccessDenied>;
  }
};

export default Page;
