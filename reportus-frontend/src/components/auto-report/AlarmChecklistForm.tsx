"use client";

import React, { useState, useEffect } from "react";
import ChecklistItem from "../forms/Checklist";
import AutoReportBtn from "./AutoReportBtn";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { io } from "socket.io-client";

export interface checklistObject {
  id: number;
  groupName: string;
  tasks: {
    id: number;
    taskName: string;
    completed: boolean;
    timestamp: Date;
    type: "simple_task" | "question" | "input" | "select";
    condition?: boolean;
    text?: string;
  }[];
  timestamp: Date;
  completed: boolean;
}

interface Alarm {
  alarmId: string;
  customer: string;
  mode: "lvl1" | "lvl2";
  token: string | undefined;
}

interface ExtAlarmObject {
  external_alarm: string;
}

const AlarmChecklistForm = ({ alarmId, customer, mode, token }: Alarm) => {
  const [checklist, setChecklist] = useState<checklistObject[]>([]);
  const [activeGroup, setActiveGroup] = useState(0);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const [alarms, setAlarms] = useState<ExtAlarmObject[]>([
    { external_alarm: alarmId },
  ]);

  useEffect(() => {
    var template = "";

    switch (mode) {
      case "lvl1":
        template = "socLvl1";
        break;

      case "lvl2":
        template = "socLvl2";
        break;

      default:
        break;
    }

    const fetchData = async () => {
      const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${template}.json`;

      try {
        const response = await fetch(serverUrl);
        const data = await response.json();
        setChecklist(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [mode]);

  useEffect(() => {
    //@ts-expect-error
    const renderAlarmlist = (data) => {
      setAlarms(alarms.concat(data));
    };

    const socket = io();

    socket.on("connect", () => {});

    socket.on("alertId", renderAlarmlist);

    return () => {
      (socket.off("alertId", renderAlarmlist), socket.off("connect"));
    };
  }, [alarms]);

  /* 
    const handleToggleCheck = (id:number) => {
        setChecklist ((prevChecklist) => prevChecklist.map((item) =>  {
            if(item.id === id) {

                const timestamp = new Date
                
               if (item.completed === false) {return {
                    ...item, completed: !item.completed, timestamp: timestamp
            }} 

            

        }

        
    
    return item})
        )
    } */

  const handleTaskChange = (groupId: number, taskId: number, answer = null) => {
    const updatedData = checklist.map((group) => {
      const timestamp = new Date();

      if (group.id === groupId) {
        const updatedTasks = group.tasks.map((task) => {
          if (task.id === taskId) {
            switch (task.type) {
              case "simple_task":
                return {
                  ...task,
                  completed: !task.completed,
                  timestamp: timestamp,
                };

              case "question":
                var cond = false;
                if (answer === "yes") {
                  cond = true;
                }
                return {
                  ...task,
                  completed: true,
                  timestamp: timestamp,
                  condition: cond,
                };

              case "input":
                return {
                  ...task,
                  completed: !task.completed,
                  timestamp: timestamp,
                  text: answer,
                };

              case "select":
                return {
                  ...task,
                  completed: !task.completed,
                  timestamp: timestamp,
                  text: answer,
                };

              default:
                break;
            }
          }

          return task;
        });
        // Check if all tasks in the group are completed
        const groupCompleted = updatedTasks.every((task) => task.completed);

        return {
          ...group,
          tasks: updatedTasks,
          completed: groupCompleted,
          active: !groupCompleted,
          timestamp: timestamp,
        };
      }
      return group;
    });

    //@ts-ignore
    setChecklist(updatedData);

    const currentGroup = updatedData[activeGroup];
    if (currentGroup.tasks.every((task) => task.completed)) {
      moveToNextGroup();
    }
  };

  const moveToNextGroup = () => {
    if (activeGroup < checklist.length - 1) {
      setActiveGroup((prevActiveGroup) => prevActiveGroup + 1);
    }
  };

  const router = useRouter();

  const uncheckedItems = checklist.filter((item) => !item.completed);

  const submitReport = async () => {
    const group_1 = checklist[0].tasks;
    // const group_2 = checklist[1].tasks

    var method = "";

    if (mode === "lvl1") {
      try {
        // Auf aktuelle Payload URL ändern!!
        const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/auto_reports`;

        const req = await fetch(`${url}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            alarms: alarms,
            customer: customer,
            soc_l1: {
              relevance: group_1[0].condition,
              notes: category,
              finished: checklist[0].timestamp,
            },
          }),
        });
        const data = await req.json();

        toast.success("Ein Bericht wurde erstellt");

        router.push("/");

        router.refresh();
      } catch (err) {
        console.log(err);

        toast.error("Etwas ist schief gelaufen");
      }
    } else if (mode === "lvl2") {
      // Auf aktuelle Payload URL ändern!!
      const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/auto_reports`;

      try {
        const req = await fetch(`${url}/${alarmId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            soc_l2: {
              valid_incident: group_1[0].condition,
              notes: category,
              level: level,
              finished: checklist[0].timestamp,
            },
          }),
        });
        const data = await req.json();

        toast.success("Ein Bericht wurde erstellt");

        router.push("/");

        router.refresh();
      } catch (err) {
        console.log(err);

        toast.error("Etwas ist schief gelaufen");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <h1 className="text-xl text-center font-bold">Alarm Checkliste</h1>

        <ul className="container container-sm">
          {checklist.length != 0 ? (
            checklist.map((item, index) => (
              <ChecklistItem
                disabled={activeGroup !== index ? true : false}
                key={item.id}
                item={item}
                categoryChange={setCategory}
                levelChange={setLevel}
                onToggleCompleted={handleTaskChange}
              />
            ))
          ) : (
            <h2 className="text-2xl font-bold text-asoftnet-900">Loading...</h2>
          )}
        </ul>

        <div className="text-center">
          {" "}
          <AutoReportBtn
            text={"Absenden"}
            className={
              uncheckedItems.length === 0 ? "all_checked" : "unchecked"
            }
            submit={submitReport}
          ></AutoReportBtn>
        </div>
      </div>
    </>
  );
};

export default AlarmChecklistForm;
