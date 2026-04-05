import { checkCriticality } from "./checkCrit";

interface Asset {
  host: string;
  alias?: string;
  severity: string;
}

interface AlertData {
  level: string;
  description: string;
  id: string;
}
export const saveAlarm = async (
  key: string,
  customer: string,
  asset: Asset,
  alert: AlertData,
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `service_users API-Key ${key}`,
  };

  try {
    const customerReq = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/customers/${customer}?depth=1`,
      {
        method: "GET",
        headers: headers,
      },
    );

    const res = customerReq.statusText;

    if (res === "OK") {
      const customerData = await customerReq.json();

      var assetRevaluation = checkCriticality(asset.severity, alert.level);

      const body = {
        customer: customer,
        reference_id: alert.id,
        asset: {
          host: asset.host,
          alias: "",
        },
        level: assetRevaluation,
        description: alert.description,
      };

      if (asset.alias) {
        body.asset.alias = asset.alias;
      }

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/external_alerts`,
        {
          method: "POST",

          credentials: "include",
          headers: headers,
          body: JSON.stringify(body),
        },
      );

      const status = req.statusText;

      if (status === "Created") {
        const data = await req.json();

        const alarmData = {
          id: data.doc.id,
          customer: data.doc.customer,
          asset: data.doc.asset.host,
          level: data.doc.level,
          createdAt: data.doc.createdAt,
          description: data.doc.description,
        };
        return alarmData;
      } else if (status === "Forbidden" || status === "Bad Request") {
        return status;
      }
    } else return "Not Found";
  } catch (err) {
    console.log(err);
  }
};
