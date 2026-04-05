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
  customer: Customer;
}

const AlertTableFixed = ({ data, customer }: alertArray) => {
  return (
    <>
      <div className="bg-red-100 p-4 rounded-md">
        <h1 className="text-center text-red-900 font-semibold text-xl">
          Neuer Alarm für {customer.name} :{" "}
        </h1>

        <DataTableAlerts
          columns={AlertListCustomersColumns}
          data={data}
        ></DataTableAlerts>
      </div>
    </>
  );
};

export default AlertTableFixed;
