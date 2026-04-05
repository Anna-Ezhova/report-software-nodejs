import { User } from "@/payload-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TableData {
  date: string | Date;
  lead: string | User;
  employees: string;
  shift: "0" | "1" | "2";
  events: string;
  special_events: string | null | undefined;
}

const SocReportTemplate = ({
  date,
  lead,
  employees,
  shift,
  events,
  special_events,
}: TableData) => {
  console.log(typeof shift);
  var switchShift = "";

  switch (shift) {
    case "0":
      switchShift = "06:00 - 14:00";
      break;

    case "1":
      switchShift = "14:00 - 22:00";
      break;

    case "2":
      switchShift = "22:00 - 06:00";
      break;

    default:
      break;
  }

  const d = new Date(date);
  const parsedDate = d.toLocaleDateString();

  var userName = "";

  {
    typeof lead != "string"
      ? (userName = `${lead.first_name} ${lead.last_name}`)
      : (userName = "Gelöscht");
  }

  return (
    <div className="container relative flex  flex-col items-center justify-center lg:px-0 p-4 w-3/5 ">
      <Table className="rounded-md bg-slate-50">
        <TableHeader className="bg-asoftnet-100 rounded-md">
          <TableRow>
            <TableHead colSpan={4} className="font-semibold text-slate-800">
              {parsedDate}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">Schichtleiter:</TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell className="font-semibold">Schicht:</TableCell>
            <TableCell>{switchShift}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">Schichtmitarbeiter:</TableCell>
            <TableCell>{employees}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">Vorkommnisse:</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{events}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">
              Besondere Vorkommnisse:
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{special_events}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SocReportTemplate;
