import { AutoReport, User, ExternalAlert, Customer } from "@/payload-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { notFound } from "next/navigation";

import AlertTableReport from "./AlertTableReport";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Breadcrumbs from "../Breadcrumbs";
import TableLvl2 from "./TableLvl2";
import { getDocById } from "@/server/helperFunctions";
import { cookies } from "next/headers";

interface reportId {
  reportId: string;
}

const AutoReportTemplate = async ({ reportId }: reportId) => {
  const nextCookies = await cookies();

  const report = await getDocById("auto_reports", reportId, nextCookies);

  if (!report) return notFound();

  const alarmsArray: ExternalAlert[] = [];
  const alarms = report.alarms;

  for (let i = 0; i < alarms.length; i++) {
    var info = alarms[i].external_alarm as ExternalAlert;

    alarmsArray.push(info);
  }

  console.log(alarmsArray);
  const socLvl1 = report.soc_l1;
  const dsoc1 = new Date(socLvl1.finished);
  const dsoc1Parsed = dsoc1.toLocaleString();

  const socLvl2 = report.soc_l2;

  var date2parsed = "";

  if (socLvl2) {
    var dsoc2 = socLvl2!.finished as string;
    var dsocDate2 = new Date(dsoc2);
    date2parsed = dsocDate2.toLocaleString();
  }

  const userLvl1 = report.user_lvl1 as User;

  var userNameLvl1 = `${userLvl1!.first_name} ${userLvl1!.last_name}`;
  var userNameLvl2 = "";

  if (report.user_lvl2) {
    var userLvl2 = report.user_lvl2 as User;
    userNameLvl2 = `${userLvl2!.first_name} ${userLvl2!.last_name}`;
  }

  const d1 = new Date(report.createdAt);
  const createdAt = d1.toLocaleString();
  const d2 = new Date(report.updatedAt);
  const updatedAt = d2.toLocaleString();

  const customer = report.customer as Customer;

  const BREADCRUMBS = [
    { id: 1, name: "Homepage", href: "/" },
    { id: 2, name: "SOC-Wiki", href: "#" },
    { id: 3, name: "Kundenübersicht", href: "/customer-overview" },
    { id: 4, name: customer.name, href: `/customer/${customer.id}` },
  ];

  return (
    <>
      {" "}
      <Breadcrumbs
        BREADCRUMBS={BREADCRUMBS}
        currentPage="Bericht Anzeigen"
      ></Breadcrumbs>
      <MaxWidthWrapper className="flex columns-2 justify-center">
        {" "}
        <section className="w-1/2 m-5">
          <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 p-4 ">
            <AlertTableReport data={alarmsArray}></AlertTableReport>
          </div>
        </section>
        <section className="w-1/2">
          <div className="container relative flex  flex-col items-center justify-center lg:px-0 p-4 ">
            <Table className="rounded-md bg-slate-50">
              <TableHeader className="bg-asoftnet-300 rounded-md">
                <TableRow>
                  <TableHead className="font-semibold text-slate-800">
                    Erstellt um:
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800">
                    {createdAt}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800">
                    Letzte Bearbeitung:
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800">
                    {updatedAt}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="bg-asoftnet-200 hover:bg-asoftnet-100 font-semibold">
                  <TableCell colSpan={4}>SOC Level 1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">
                    Bearbeitet durch:
                  </TableCell>
                  <TableCell colSpan={2}>{userNameLvl1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">
                    Bearbeitet um:
                  </TableCell>
                  <TableCell>{dsoc1Parsed}</TableCell>
                  <TableCell className="font-semibold">
                    Ist es ein Security Incident?
                  </TableCell>
                  <TableCell>{socLvl1.relevance ? "Ja" : "Nein"}</TableCell>
                </TableRow>
                <TableRow></TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Kommentare:</TableCell>
                  <TableCell colSpan={3}>{socLvl1.notes}</TableCell>
                </TableRow>

                {report.user_lvl2 ? (
                  <TableLvl2
                    user={userNameLvl2}
                    date={date2parsed}
                    validity={socLvl2!.valid_incident}
                    level={socLvl2!.level}
                    notes={socLvl2!.notes}
                  ></TableLvl2>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default AutoReportTemplate;
