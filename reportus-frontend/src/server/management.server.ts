import {
  TMeetingProtocolValidator,
  TPostFormValidator,
  TTaskFormValidator,
} from "@/lib/validators/forms/forms-validators";

interface payloadQuery {
  collection: "management_protocols" | "meeting_protocols";
  id: string;
  data: {};
}

// Auf aktuelle Payload URL ändern!!
const urlBase = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}`;

export async function newMeeting(
  input: TMeetingProtocolValidator,
  token: string | undefined,
) {
  const {
    organizer,
    date,
    location,
    start_time,
    end_time,
    participants_intern,
    participants_extern,
    topic,
    tasks,
    notes,
  } = input;

  var d = date.toString();
  var st = start_time.toString();
  var et = end_time.toString();

  var collection = "";

  switch (topic) {
    case "weekly":
      collection = "meeting_protocols";
      break;
    case "verwaltung":
      collection = "management_protocols";
      break;

    default:
      collection = "meeting_protocols";
      break;
  }

  const url = `${urlBase}/api/${collection}`;

  const body = {
    organizer,
    date: d,
    location,
    start_time: st,
    end_time: et,
    participants_intern,
    participants_extern,
    topic,
    tasks: tasks,
    notes,
  };

  try {
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(body),
    });

    console.log(req);

    return { success: true, message: "Bericht wurde erstellt" };
  } catch (error) {
    return {
      success: false,
      message: "Fehler bei der Speicherung",
      errors: { error },
    };
  }
}

export async function updateMeeting(
  input: TTaskFormValidator,
  token: string | undefined,
) {
  const { id, type, tasks } = input;

  var collection = "";

  switch (type) {
    case "weekly":
      collection = "meeting_protocols";
      break;
    case "verwaltung":
      collection = "management_protocols";
      break;

    default:
      collection = "meeting_protocols";
      break;
  }

  const url = `${urlBase}/api/${collection}/${id}`;

  try {
    const req = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        tasks: tasks,
      }),
    });

    console.log(req);

    return { success: true, message: "Bericht wurde erstellt" };
  } catch (error) {
    return {
      success: false,
      message: "Fehler bei der Speicherung",
      errors: { error },
    };
  }
}

export async function createPostEntry(
  input: TPostFormValidator,
  token: string | undefined,
) {
  const {
    serial_number,
    date_of_record,
    date_of_letter,
    recipient,
    subject,
    notes,
  } = input;

  var date1 = date_of_record.toString();
  var date2 = date_of_letter.toString();

  const url = `${urlBase}/api/post_entries`;

  const body = {
    serial_number,
    date_of_record: date1,
    date_of_letter: date2,
    recipient,
    subject,
    notes,
  };

  try {
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(body),
    });

    console.log(req);

    return { success: true, message: "Bericht wurde erstellt" };
  } catch (error) {
    return {
      success: false,
      message: "Fehler bei der Speicherung",
      errors: { error },
    };
  }
}
