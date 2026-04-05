"use client";

import { AutoReport, Customer, ExternalAlert } from "@/payload-types";
import AlarmChecklistForm from "./AlarmChecklistForm";
import AlertTable from "./AlertTable";
import { useEffect, useState } from "react";
import PhoneNumbersTable from "../tables/PhoneNumbers";
import AlertTableFixed from "./AlertTableFixed";

interface AlarmData {
  alarm: ExternalAlert | AutoReport;
  mode: "lvl1" | "lvl2";
  token: string | undefined;
}

const AutoReportFrame = ({ alarm, mode, token }: AlarmData) => {
  const [allAlarms, setAllAlarms] = useState<string[]>([alarm.id]);

  const customerData = alarm.customer as Customer;
  const customerId = customerData.id;

  var alarmList: ExternalAlert[] = [];
  var comment = "";

  //@ts-ignore
  if (alarm.alarms) {
    const autoReport = alarm as AutoReport;

    for (let i = 0; i < autoReport.alarms.length; i++) {
      var item = autoReport.alarms[i].external_alarm as ExternalAlert;
      alarmList.push(item);
    }

    comment = `Notizen: ${autoReport.soc_l1.notes}`;
  }

  return (
    <>
      <section className="w-1/2">
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 p-2 border-b-2">
          {
            //@ts-ignore
            alarm.alarms ? (
              <AlertTableFixed
                data={alarmList}
                customer={customerData}
              ></AlertTableFixed>
            ) : (
              //@ts-ignore
              <AlertTable data={alarm}></AlertTable>
            )
          }

          <div className="bg-asoftnet-50 rounded-md p-4 mr-8 mt-2">
            {
              //@ts-expect-error
              alarm.alarms ? (
                <div className="text-asoftnet-950  font-semibold">
                  <h2>{comment}</h2>
                </div>
              ) : null
            }
          </div>
        </div>
        <div className="container relative flex pt-10 flex-col items-center justify-center lg:px-0 p-2 ">
          <PhoneNumbersTable></PhoneNumbersTable>
        </div>
      </section>
      <section className="border-l border-slate-200 bg-slate-50 w-1/2">
        <div className="bg-slate-100 rounded-md p-4">
          <AlarmChecklistForm
            alarmId={alarm.id}
            customer={customerId}
            mode={mode}
            token={token}
          ></AlarmChecklistForm>
        </div>
      </section>
    </>
  );
};

export default AutoReportFrame;
