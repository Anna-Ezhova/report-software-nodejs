"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { EllipsisIcon } from "lucide-react";

interface customerData {
  customerId: string;
  name: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
  };
}

const CustomerInfoField = ({ customerId, name, contact }: customerData) => {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-2xl font-semibold font-slate-800 p-1 border-b-2 border-asoftnet-300">
        {" "}
        {name}{" "}
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
          {contact ? (
            <TableRow>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>

              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.role}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                Inzident Response Team der Asoftnet
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell colSpan={4} className="text-right">
              <Link
                href={`/customer/${customerId}`}
                className={buttonVariants({
                  variant: "ghost",
                  className: "gap-1.5",
                })}
              >
                <EllipsisIcon />
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerInfoField;
