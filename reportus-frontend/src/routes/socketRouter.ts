import express from "express";
import { Server } from "socket.io";
import { saveAlarm } from "./saveAlarm";
// import { getAlarms } from "./deleteDublicates";

export const SocketRouter = (io: Server) => {
  const router = express.Router();

  router.use(express.json());

  //@ts-expect-error
  router.post("/alert", async (req, res) => {
    const ApiKey = req.body.key;
    const customer = req.body.customer;
    const asset = req.body.asset;
    const level = req.body.alert;

    if (!ApiKey) {
      res.json({
        message: "key doesn't exist",
      });
      return
    }

    if (!asset.host) {

      res.json({
        message: "Alarm for an undocumented host"
      })
      return

    }

    //Alarms with "LOW" oder "MEDIUM" werden nicht gespeichert

    if (level.level === "LOW" || level.level === "MEDIUM") {
      res.json({
        message: "Alarm gering, wird nicht gespeichert",
      });
    } else {
      try {
        // Alarm wird gespeichert. Falls Alarm ID schon existiert, soll es nicht nochmal gespeichert sein

        const newAlarm = await saveAlarm(ApiKey, customer.id, asset, level);

        if (newAlarm === "Bad Request") {
          res.json({ error: "Alarm wurde schon gespeichert" });
          return;
        } else if (newAlarm != "Forbidden" && newAlarm != "Not Found") {
          if (
            newAlarm!.level === "HIGH CRITICAL" ||
            newAlarm!.level === "CRITICAL" ||
            newAlarm!.level === "HIGH"
          ) {
            io.emit("alert", {
              id: newAlarm!.id,
              customer: customer.name,
              asset: newAlarm!.asset,
              level: newAlarm!.level,
              createdAt: newAlarm!.createdAt,
              description: newAlarm!.description,
            });
            io.emit("alertId", { external_alarm: newAlarm!.id });
            res.json({
              message: "Alarm gespeichert und an Reportus weitergeleitet",
            });
          } else if (
            newAlarm!.level === "MEDIUM" ||
            newAlarm!.level === "LOW"
          ) {
            res.json({
              message: "Alarm gespeichert",
            });
          }
        } else {
          console.log("Forbidden");
          res.json({ error: "Forbidden" });
        }
      } catch (error) {
        console.log(error);
        res.json({ error: error });
      }
    }
  });

  /* router.post("/delete", async (req, res) => {
    
        const ApiKey = req.body.key
        const level = req.body.level
    
        if(!ApiKey) {
            res.json({
               message: "key doesn't exist"
            })
        } 
    
         try {
          getAlarms(level, ApiKey)
          res.json({"success": "Alle Duplicate gelöscht" })
        } catch (error) {
          res.json({"error": error})
        } 
        
    
    
    
    
    }) */

  return router;
};
