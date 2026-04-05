import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MeetingProtocol } from "@/payload-types";

interface Meeting {
  organizer: string;
  date: string | Date;
  location:
    | "Geschäftsführungraum"
    | "Besprechungsraum"
    | "Verwaltungsbüro"
    | "Teams"
    | "Arbeitsplatz";
  start_time: string | Date;
  end_time: string | Date;
  participants_intern: string;
  participants_extern: string | null | undefined;
  topic: "weekly" | "verwaltung";
  notes: string | null | undefined;
}

const MeetingReport = ({
  organizer,
  date,
  location,
  start_time,
  end_time,
  participants_intern,
  participants_extern,
  notes,
  topic,
}: Meeting) => {
  const dateParsed = (dateString: string) => {
    const date = new Date(dateString);
    const parsed = date.toLocaleDateString();
    return parsed;
  };

  const timeParsed = (timeString: string) => {
    const time = new Date(timeString);
    const parsed = time.toLocaleTimeString();
    return parsed;
  };

  const d = dateParsed(date as string);
  const start = timeParsed(start_time as string);
  const end = timeParsed(end_time as string);

  var topicString = "";

  switch (topic) {
    case "weekly":
      topicString = "Weekly Meetings";

      break;

    case "verwaltung":
      topicString = "Verwaltungsmeeting";

      break;

    default:
      break;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }}>
        <TableHead>
          <TableRow>
            <TableCell>{d}</TableCell>
            <TableCell> {`${start} - ${end}`} </TableCell>
            <TableCell>
              <b>Protokollführer:</b>
            </TableCell>
            <TableCell>{organizer}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow></TableRow>

          <TableRow>
            <TableCell>
              <b>Ort:</b>
            </TableCell>
            <TableCell>{location}</TableCell>
            <TableCell>
              <b>Thema:</b>
            </TableCell>
            <TableCell>{topicString}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <b>Teilnehmer Intern:</b>
            </TableCell>
            <TableCell colSpan={3}> {participants_intern} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {" "}
              <b> Teilnehmer Extern:</b>
            </TableCell>
            <TableCell colSpan={3}> {participants_extern} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {" "}
              <b>Notizen:</b>{" "}
            </TableCell>
            <TableCell> {notes} </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingReport;
