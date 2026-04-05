import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CustomerRow from "./CustomerRow";
import { cookies } from "next/headers";
import { getDocById } from "@/server/helperFunctions";

interface customerId {
  customerId: string;
}

const CustomerTable = async ({ customerId }: customerId) => {
  const nextCookies = await cookies();

  const customer = await getDocById("customers", customerId, nextCookies);

  return (
    <div>
      <h3 className="text-2xl font-semibold font-slate-800 ml-5">
        {" "}
        {customer.name}{" "}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ansprechspartner</TableHead>
            <TableHead>Telefonnummer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rolle/Funktion</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <CustomerRow {...customer}></CustomerRow>

          {customer.notes ? (
            <TableRow>
              <TableCell>
                {" "}
                <b>Notizen:</b>{" "}
              </TableCell>
              <TableCell colSpan={3}>{customer.notes}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
