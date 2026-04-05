import { DataTable } from "./tables/DataTable";
import { AlertListCustomersColumns } from "./tables/column-data";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/user-cookies";
import { getLastFive } from "@/server/helperFunctions";

interface customerId {
  id: string;
}

const Last5Alarms = async ({ id }: customerId) => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  const data = await getLastFive("external_alerts", nextCookies);

  return (
    <DataTable columns={AlertListCustomersColumns} data={data}></DataTable>
  );
};

export default Last5Alarms;
