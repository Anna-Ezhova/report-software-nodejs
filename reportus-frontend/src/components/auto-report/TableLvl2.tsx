import { TableCell, TableRow } from "../ui/table";

interface Lvl2Data {
  user: string;
  date: string;
  validity: boolean | null | undefined;
  level: string | null | undefined;
  notes: string | null | undefined;
}

const TableLvl2 = ({ user, date, validity, level, notes }: Lvl2Data) => {
  return (
    <>
      <TableRow className="bg-asoftnet-200 hover:bg-asoftnet-100 font-semibold">
        <TableCell colSpan={4}>SOC Level 2</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-semibold">Bearbeitet durch:</TableCell>
        <TableCell>{user}</TableCell>
        <TableCell className="font-semibold">Bearbeitet um:</TableCell>
        <TableCell>{date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-semibold">
          Ist es ein valider Security Incident?
        </TableCell>
        <TableCell>{validity ? "Ja" : "Nein"}</TableCell>
        <TableCell className="font-semibold">Priorität</TableCell>
        <TableCell>{level}</TableCell>
      </TableRow>
      <TableRow></TableRow>
      <TableRow>
        <TableCell className="font-semibold">Kommentare:</TableCell>
        <TableCell colSpan={3}>{notes}</TableCell>
      </TableRow>
    </>
  );
};

export default TableLvl2;
