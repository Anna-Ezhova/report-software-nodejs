"use client";
import { Customer, ExternalAlert } from "@/payload-types";
import { DataTable } from "../tables/DataTable";
import { DataTableAlerts } from "./DataTableAlerts";
import { AlertTableColumns, alertData } from "../tables/column-data";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface alertArray {
  data: ExternalAlert;
}

const AlertTable = ({ data }: alertArray) => {
  const [alertData, setAlertData] = useState<alertData[]>([
    {
      id: data.id,
      customer: data.customer,
      asset: data.asset.host,
      alias: data.asset.alias as string,
      level: data.level,
      createdAt: data.createdAt,
      description: data.description,
    },
  ]);

  /* const alarmsMockup: alertData[] = [
        
       
    ] */

  useEffect(() => {
    //@ts-expect-error
    const renderTable = (data) => {
      setAlertData(alertData.concat(data));
      console.log(alertData);
    };

    const socket = io();

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("alert", renderTable);

    return () => {
      (socket.off("alert", renderTable), socket.off("connect"));
    };
  }, [alertData]);

  const customer = data.customer as Customer;

  return (
    <>
      <div className="bg-red-100 p-4 rounded-md">
        <h1 className="text-center text-red-900 font-semibold text-xl">
          Neuer Alarm für {customer.name} :{" "}
        </h1>

        <DataTableAlerts
          columns={AlertTableColumns}
          data={alertData}
        ></DataTableAlerts>
      </div>
    </>
  );
};

export default AlertTable;
