"use client";
import { Customer, ExternalAlert } from "@/payload-types";
import { DataTable } from "../tables/DataTable";
import { DataTableAlerts } from "./DataTableAlerts";
import {
  AlertListCustomersColumns,
  AlertTableColumns,
  alertData,
} from "../tables/column-data";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface alertArray {
  data: ExternalAlert[];
}

const AlertTableReport = ({ data }: alertArray) => {
  const customer = data[0].customer as Customer;

  return (
    <>
      <div className="bg-asoftnet-100 p-4 rounded-md">
        <h1 className="text-center text-asoftnet-900 font-semibold text-xl">
          Betroffene Alarme für {customer.name}:{" "}
        </h1>

        <DataTableAlerts
          columns={AlertListCustomersColumns}
          data={data}
        ></DataTableAlerts>
      </div>
    </>
  );
};

export default AlertTableReport;
