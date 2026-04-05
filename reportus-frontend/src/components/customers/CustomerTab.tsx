import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AlertListCustomersColumns,
  AlertTableColumns,
  columnsSocAlert,
  columnsSocAutoReport,
} from "../tables/column-data";
import { DataTable } from "../tables/DataTable";
import SocAlertTemplate from "../tables/SocAlertTemplate";
import { Button, buttonVariants } from "../ui/button";

import Link from "next/link";
import { getAllReports } from "@/server/helperFunctions";
import { cookies } from "next/headers";

interface customerId {
  customerId: string;
}

const CustomerTab = async ({ customerId }: customerId) => {
  const nextCookies = await cookies();
  const token = nextCookies.get("payload-token")?.value;

  const reports = await getAllReports("soc_alert", token);

  const latest = reports[0];

  const alarms = await getAllReports("external_alerts", token);

  const autoReports = await getAllReports("auto_reports", token);

  return (
    <Tabs
      className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 p-4"
      defaultValue="latest_report"
    >
      <TabsList>
        <TabsTrigger value="latest_report">Letzter Bericht</TabsTrigger>
        <TabsTrigger value="all_reports">Notfallberichte</TabsTrigger>
        <TabsTrigger value="auto_reports">Automatisierte Berichte</TabsTrigger>
        <TabsTrigger value="all_alarms">Alarme</TabsTrigger>
      </TabsList>
      <TabsContent value="all_reports">
        <DataTable columns={columnsSocAlert} data={reports}></DataTable>
      </TabsContent>
      <TabsContent value="auto_reports">
        <DataTable
          columns={columnsSocAutoReport}
          data={autoReports}
        ></DataTable>
        <div className="mt-2 justify-center">
          <Link
            href={`/api/v1/alarm-export?customerId=${customerId}&mode=auto_reports`}
            className={buttonVariants({
              variant: "default",
              className: "gap-1.5",
            })}
          >
            Beriche exportieren
          </Link>
        </div>
      </TabsContent>
      <TabsContent value="all_alarms">
        <DataTable
          columns={AlertListCustomersColumns}
          data={alarms}
        ></DataTable>

        <div className="mt-2 justify-center">
          <Link
            href={`/api/v1/alarm-export?customerId=${customerId}&mode=external_alerts`}
            className={buttonVariants({
              variant: "default",
              className: "gap-1.5",
            })}
          >
            Beriche exportieren
          </Link>
        </div>
      </TabsContent>
      <TabsContent value="latest_report">
        {latest != null ? (
          <SocAlertTemplate
            date={latest.date}
            employee={latest.employee}
            time={latest.time}
            events={latest.events}
            customer={latest.customer}
          ></SocAlertTemplate>
        ) : (
          <div className="h-80">
            <p className="pt-4 font-semibold">Keine Berichte Vorhanden</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default CustomerTab;
