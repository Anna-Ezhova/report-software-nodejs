import { Customer, User } from "@/payload-types";
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
  time: string;
  employee: string | User;
  customer: string | Customer;
  events: string;
}

const SocAlertTemplate = ({
  date,
  time,
  employee,
  customer,
  events,
}: TableData) => {
  const d = new Date(date);
  const parsedDate = d.toLocaleDateString();
  const t = new Date(time);
  const parsedTime = t.toLocaleTimeString();

  var customerName = "";

  if (typeof customer != "string") {
    customerName = customer.name;
  } else {
    customerName = customer;
  }

  var userName = "";

  {
    typeof employee != "string"
      ? (userName = `${employee.first_name} ${employee.last_name}`)
      : (userName = "Gelöscht");
  }

  return (
    <div className="relative flex flex-col items-center justify-center lg:px-0 p-4 ">
      <Table className="rounded-md bg-slate-50">
        <TableHeader className="bg-asoftnet-50 rounded-md">
          <TableRow>
            <TableHead colSpan={2} className="font-semibold text-slate-800">
              {parsedDate}
            </TableHead>
            <TableHead colSpan={2} className="font-semibold text-slate-800">
              {parsedTime}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">Mitarbeiter:</TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell className="font-semibold">Kunde:</TableCell>
            <TableCell>{customerName}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-semibold">Ablauf</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{events}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SocAlertTemplate;
