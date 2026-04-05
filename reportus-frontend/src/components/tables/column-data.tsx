"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { TSocDisplay } from "@/lib/validators/forms/soc-forms-validators";
import {
  AutoReport,
  Customer,
  ExternalAlert,
  MeetingProtocol,
  PostEntry,
  SocAlert,
  SocGeneric,
  SocVisitor,
  User,
} from "@/payload-types";

export interface ReportDataMin {
  id: string;
  lead: string | User;
  shift: "0" | "1" | "2";
  date: string | Date;
  // status: "draft" | "final"
}

export const columnsSocReports: ColumnDef<SocGeneric>[] = [
  {
    accessorKey: "lead",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Schichtleiter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lead = row.getValue("lead") as User;

      if (lead.first_name != undefined) {
        const formatted = `${lead.first_name} ${lead.last_name}`;
        return <div> {formatted} </div>;
      } else {
        return <div>Gelöscht</div>;
      }
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "shift",
    header: "Schicht",
    filterFn: "equalsString",
    cell: ({ row }) => {
      const shift = row.getValue("shift") as string;

      switch (shift) {
        case "0":
          return <div> 06:00 - 14:00 </div>;

        case "1":
          return <div> 14:00 - 22:00 </div>;

        case "2":
          return <div> 22:00 - 06:00 </div>;

        default:
          break;
      }
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  /*  {
        accessorKey: "status",
        header: "Status"
    },  */

  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      const link = `/report/${row.getValue("id")}`;
      return (
        <div>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {" "}
            Anzeigen{" "}
          </Link>
        </div>
      );
    },
  },
];

export interface NotfallReportMin {
  id: string;
  customer: string | Customer;
  date: string | Date;
  time: string | Date;
  employee: string | User;
}

export const columnsSocAlert: ColumnDef<SocAlert>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kunde
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const customer = row.getValue("customer") as Customer;
      const formatted = customer.name;
      return <div> {formatted} </div>;
    },

    filterFn: "includesString",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "time",
    header: "Zeit",
    cell: ({ row }) => {
      const date = new Date(row.getValue("time"));
      const formatted = date.toLocaleTimeString();
      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "employee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verfasser
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.getValue("employee") as User;

      if (employee.first_name != undefined) {
        const formatted = `${employee.first_name} ${employee.last_name}`;
        return <div> {formatted} </div>;
      } else {
        return <div>Gelöscht</div>;
      }
    },
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      const link = `/report/${row.getValue("id")}`;
      return (
        <div>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {" "}
            Anzeigen{" "}
          </Link>
        </div>
      );
    },
  },
];

export interface ReportDataVisitorMin {
  id: string;
  date: string | Date;
  employee: string | User;
  start: string;
  end: string;
  reason: string;
}

export const columnsSocVisitor: ColumnDef<SocVisitor>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },

  {
    accessorKey: "employee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mitarbeiter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.getValue("employee") as User;

      if (employee.first_name != undefined) {
        const formatted = `${employee.first_name} ${employee.last_name}`;
        return <div> {formatted} </div>;
      } else {
        return <div>Gelöscht</div>;
      }
    },
  },
  {
    accessorKey: "start",
    header: "Gekommen",
    cell: ({ row }) => {
      const date = new Date(row.getValue("start"));
      const formatted = date.toLocaleTimeString();
      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "end",
    header: "Gegangen",
    cell: ({ row }) => {
      const date = new Date(row.getValue("end"));
      const formatted = date.toLocaleTimeString();
      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "reason",
    header: "Grund",
  },
];

export interface alertData {
  id: string;
  customer: string | Customer;
  asset: string;
  alias?: string;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "HIGH CRITICAL";
  createdAt: string;
  description?: string | null | undefined;
}

interface Asset {
  host: string;
  alias: string;
}

export const AlertTableColumns: ColumnDef<alertData>[] = [
  {
    accessorKey: "asset",
    header: "Host",
    cell: ({ row }) => {
      const asset = row.getValue("asset") as Asset;
      const assetString = row.getValue("asset") as string;

      if (asset.host != undefined) {
        return <div> {asset.host} </div>;
      } else {
        return <div>{assetString}</div>;
      }
    },
  },
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({ row }) => {
      const asset = row.getValue("asset") as Asset;
      const alias = row.getValue("alias") as string;

      if (asset.alias != undefined) {
        return <div> {asset.alias} </div>;
      } else {
        return <div>{alias}</div>;
      }
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "createdAt",
    header: "Zeitpunkt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleString();
      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "description",
    header: "Beschreibung",
  },
];

export const AlertListCustomersColumns: ColumnDef<ExternalAlert>[] = [
  {
    accessorKey: "asset",
    header: "Host",
    cell: ({ row }) => {
      const asset = row.getValue("asset") as Asset;
      const assetString = row.getValue("asset") as string;

      if (asset.host != undefined) {
        return <div> {asset.host} </div>;
      } else {
        return <div>{assetString}</div>;
      }
    },
  },
  {
    accessorKey: "alias",
    header: "Alias",
    cell: ({ row }) => {
      const asset = row.getValue("asset") as Asset;
      const alias = row.getValue("alias") as string;

      if (asset.alias != undefined) {
        return <div> {asset.alias} </div>;
      } else {
        return <div>{alias}</div>;
      }
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "createdAt",
    header: "Zeitpunkt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleString();
      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "description",
    header: "Beschreibung",
  },
  {
    accessorKey: "notes",
    header: "Notizen",
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      //Replace with Payload url!!!

      const link = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/external_alerts/${row.getValue("id")}`;
      return (
        <div>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {" "}
            Anzeigen{" "}
          </Link>
        </div>
      );
    },
  },
];

export interface AutoReportMin {
  id: string;
  user: string | User;
  createdAt: string | Date;
}

export const columnsSocAutoReport: ColumnDef<AutoReport>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "user_lvl1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SOC Lvl 1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.getValue("user_lvl1") as User;

      if (employee.first_name != undefined) {
        const formatted = `${employee.first_name} ${employee.last_name}`;
        return <div> {formatted} </div>;
      } else {
        return <div>Gelöscht</div>;
      }
    },
  },
  {
    accessorKey: "user_lvl2",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SOC Lvl 2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (row.getValue("user_lvl2")) {
        const employee = row.getValue("user_lvl2") as User;

        if (employee.first_name != undefined) {
          const formatted = `${employee.first_name} ${employee.last_name}`;
          return <div> {formatted} </div>;
        } else {
          return <div>Gelöscht</div>;
        }
      } else return null;
    },
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      const link = `/auto-report/${row.getValue("id")}`;
      return (
        <div>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {" "}
            Anzeigen{" "}
          </Link>
        </div>
      );
    },
  },
];

export const columnsMeeting: ColumnDef<MeetingProtocol>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zeit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timeStart = new Date(row.getValue("start_time"));

      const formatted = `${timeStart.toLocaleTimeString()}`;
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "organizer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mitarbeiter
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const employee = row.getValue("organizer") as User;

      if (employee.first_name != undefined) {
        const formatted = `${employee.first_name} ${employee.last_name}`;
        return <div> {formatted} </div>;
      } else {
        return <div>Gelöscht</div>;
      }
    },
  },

  {
    accessorKey: "topic",
    header: "Thema",
    cell: ({ row }) => {
      const status = row.getValue("topic");

      var formatted = "";

      switch (status) {
        case "weekly":
          formatted = "Weekly Meetings";

          break;
        case "verwaltung":
          formatted = "Verwaltungsmeeting";

          break;

        default:
          break;
      }

      return <div> {formatted} </div>;
    },
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      var type = "";
      const status = row.getValue("topic");

      switch (status) {
        case "weekly":
          type = "weekly";

          break;
        case "verwaltung":
          type = "management";

          break;

        default:
          break;
      }

      const link = `/meeting/${row.getValue("id")}?type=${type}`;
      return (
        <div>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {" "}
            Anzeigen{" "}
          </Link>
        </div>
      );
    },
  },
];

export const columnsPost: ColumnDef<PostEntry>[] = [
  {
    accessorKey: "date_of_record",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum der Eintragung
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_of_record"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "date_of_letter",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Datum des Schreibens
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_of_letter"));
      const formatted = date.toLocaleDateString();
      return <div> {formatted} </div>;
    },
    filterFn: "includesString",
  },

  {
    accessorKey: "recipient",
    header: "Empfänger",
  },
  {
    accessorKey: "subject",
    header: "Betreff",
  },
  {
    accessorKey: "notes",
    header: "Bemerkung",
  },
];
