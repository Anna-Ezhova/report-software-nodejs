import express from "express";
import { json2csv } from "json-2-csv";

export const alarmExport = () => {
  const key = "dffbfb30-7e94-49d4-b4bf-45aa2b25f393";

  const router = express.Router();

  router.use(express.json());

  //@ts-expect-error
  router.get("/alarm-export", async ({ req, res }: unknown) => {
    try {
      // Get customerId from the query parameters
      const { customerId, mode } = req.query;

      console.log(req.query);

      if (!customerId) {
        return res.status(400).send("Customer ID is required.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `service_users API-Key ${key}`,
      };

      // Fetch alarms for the specified customer
      const alarms = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/${mode}?depth=0&where[or][0][and][0][customer][equals]=${customerId}`,
        {
          method: "GET",
          headers: headers,
        },
      );

      const data = await alarms.json();

      // Convert the alarms data to CSV

      const csv = json2csv(data.docs);

      // Set headers for CSV download
      res.header("Content-Type", "text/csv");
      res.attachment("alarms.csv");
      res.send(csv);
    } catch (err) {
      res.status(500).send("Error exporting alarms.");
    }
  });

  return router;
};
