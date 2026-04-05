import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { User } from "@/payload-types";

interface Users {
  users: User[];
  topic: "A" | "IR";
}

const getUsers = () => {
  //Placeholder for future function that will fetch the relevant workers

  //Hardcode the Users I need later
  return [
   
    {
      first_name: "Elija Jean",
      last_name: "Taubert",
      phone: "0159 02455872",
      email: "taubert@asoftnet.de",
      id: 1,
    },
  ];
};

const PhoneNumbersTable = () => {
  const users = getUsers();

  const contactRows = users.map((id) => (
    <TableRow key={id.id}>
      <TableCell>{`${id.first_name} ${id.last_name}`}</TableCell>

      <TableCell>{id.phone}</TableCell>
      <TableCell>{id.email}</TableCell>
    </TableRow>
  ));

  return (
    <>
      {/* <h3 className="text-2xl font-semibold font-slate-800"> { topic === "A" ? "Analysten Kontaktinfo" : "IR/SOC Mitarbeiter"} </h3> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ansprechspartner</TableHead>
            <TableHead>Telefonnummer</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>{contactRows}</TableBody>
      </Table>
    </>
  );
};

export default PhoneNumbersTable;
