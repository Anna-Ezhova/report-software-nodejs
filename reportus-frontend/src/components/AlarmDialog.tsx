"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AlarmDialog = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [sockets, setSockets] = useState([]);
  var link = "";
  useEffect(() => {
    //@ts-expect-error
    const renderAlertWindow = (data) => {
      console.log(window.location.href);
      if (
        window.location.href !==
        `${process.env.NEXT_PUBLIC_SERVER_URL}/soc-lvl-1/${link}`
      ) {
        setSockets(sockets.concat(data));
        setIsOpen(true);
      } else {
        toast.info("New Alert");
      }
    };

    const socket = io();
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("alert", renderAlertWindow);

    return () => {
      socket.off("alert", renderAlertWindow);
      socket.off("connect");
    };
  }, [sockets, link]);

  
  {//@ts-expect-error
    sockets.length !== 0 ? (link = sockets[0].id) : (link = "null");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-red-200 p-12 rounded-md text-center shadow-slate-600">
          <DialogTitle className="font-bold text-2xl text-red-900">
            {" "}
            Neuer Alarm{" "}
          </DialogTitle>
          <Description className="text-red-800 font-bold text-xl">
            Aktion erforderlich!{" "}
          </Description>
          <p>Klicken Sie auf weiter um Berichtseite zu öffnen.</p>
          <div className="flex gap-4 justify-center">
            {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
            <button
              className="text-red-950 bg-red-400 hover:bg-red-500 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              onClick={() => {
                router.push(`/soc-lvl-1/${link}`);
                setIsOpen(false);
              }}
            >
              Weiter
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AlarmDialog;
