import {
  TBcixValidator,
  TSocAlert,
  TSocRegularValidator,
  TSocVisitor,
} from "@/lib/validators/forms/soc-forms-validators";

// Auf aktuelle Payload URL ändern!!
const urlBase = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}`;

export async function createReportGeneric(
  input: TSocRegularValidator,
  token: string | undefined,
) {
  const { lead, employees, date, shift, events, special_events } = input;

  var d = date.toString();

  const url = `${urlBase}/api/soc_generic`;

  try {
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        lead: lead,
        employees: employees,
        date: d,
        shift: shift,
        events: events,
        special_events: special_events,
      }),
    });

    return { success: true, message: "Bericht wurde erstellt" };
  } catch (error) {
    return {
      success: false,
      message: "Fehler bei der Speicherung",
      errors: { error },
    };
  }
}
export async function createReportVisitor(
  input: TSocVisitor,
  token: string | undefined,
) {
  const { employee, date, start, end, reason } = input;
  var d = date.toString();
  var s = start.toString();
  var e = end.toString();
  const body = {
    employee,
    date: d,
    start: s,
    end: e,
    reason,
  };

  const url = `${urlBase}/api/soc_visitors`;

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
export async function createAlert(input: TSocAlert, token: string | undefined) {
  const { employee, customer, date, time, events } = input;

  var d = date.toString();
  var t = time.toString();

  const url = `${urlBase}/api/soc_alert`;

  const body = {
    employee,
    date: d,
    time: t,
    customer,
    events,
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

export async function alarmBcix(
  input: TBcixValidator,
  token: string | undefined,
) {
  const { eventType, priority, summary, details, alertKey } = input;

  const url = `${urlBase}/api/bcix_alert`;

  const body = {
    eventType,
    priority,
    alertKey,
    summary,
    details,
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

    const response = await fetch("https://bcix.ilert.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: process.env.BCIX_ILERT_API_KEY,
        eventType: eventType,
        summary: summary,
        details: details + "n\ Bitte melden unter der Nummer: 0361 77519508 ",
        alertKey: "",
        priority: priority,
        images: [
          {
            src: "",
            href: "",
            alt: "",
          },
        ],
        links: [
          {
            href: "",
            text: "",
          },
        ],
        comments: [
          {
            creator: "",
            content: "",
          },
        ],
        customDetails: null,
        routingKey: "",
      }),
    });

    return { success: true, message: "Bericht wurde erstellt" };
  } catch (error) {
    return {
      success: false,
      message: "Fehler bei der Speicherung",
      errors: { error },
    };
  }
}
