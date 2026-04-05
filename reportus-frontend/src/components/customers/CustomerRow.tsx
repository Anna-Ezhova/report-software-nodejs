import { Customer } from "@/payload-types";
import { TableCell, TableRow } from "../ui/table";

const CustomerRow = (customer: Customer) => {
  if (customer.contact) {
    const contactRows = customer.contact.map((id) => (
      <TableRow key={id.id}>
        <TableCell>{id.name}</TableCell>
        <TableCell>{id.phone}</TableCell>

        <TableCell>{id.email}</TableCell>
        <TableCell>{id.role}</TableCell>
      </TableRow>
    ));
    return contactRows;
  } else {
    return (
      <TableRow>
        <TableCell colSpan={3}>Inzident Response Team der Asoftnet</TableCell>
      </TableRow>
    );
  }
};

export default CustomerRow;
