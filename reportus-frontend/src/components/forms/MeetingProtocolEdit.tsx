"use client";

import {
  TTaskFormValidator,
  TaskFormValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  AddCircleOutlineRounded,
  DeleteForeverRounded,
} from "@mui/icons-material";

import { User } from "@/payload-types";
import { updateMeeting } from "@/server/management.server";
const { DateTime } = require("luxon");

interface taskObject {
  topic: string;
  content: string;
  accountable: string | undefined;
  due_date: string | Date | undefined;
  status: "to_do" | "done" | "postponed";
}

interface userAndTasks {
  id: string;
  existingTasks: taskObject[];
  type: "weekly" | "management" | undefined;
  token: string | undefined;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MeetingProtocolEdit = ({
  id,
  existingTasks,
  type,
  token,
}: userAndTasks) => {
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users`;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from Payload CMS API using fetch
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        setUsers(data.docs); // Assuming the response contains the list of users
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [url]);

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TTaskFormValidator>({
    resolver: zodResolver(TaskFormValidator),
  });

  const router = useRouter();

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const [arrayValues, setArrayValues] = React.useState<taskObject[]>([
    {
      topic: "",
      content: "",
      accountable: "",
      due_date: new Date(),
      status: "to_do",
    },
  ]);

  const now = DateTime.now();

  useEffect(() => {
    //@ts-ignore
    replace(existingTasks);
  }, [replace, existingTasks]);

  //  const onSubmit: SubmitHandler<TMeetingProtocolValidator> = (data) => {
  const onSubmit: SubmitHandler<TTaskFormValidator> = async (data) => {
    const { id, type, tasks } = data;

    const { success, message, errors } = await updateMeeting(
      { id, type, tasks },
      token,
    );

    if (!success && message) {
      toast.error(message);
      return;
    }

    if (!success && errors) {
      for (const key in errors) {
        // @ts-ignore
        setError(key, { message: errors[key] });
      }
      return;
    }

    toast.success(message);
    router.refresh();

    router.push("/");
    return;
  };

  /* const {mutate, isLoading} = trpc.forms.updateMeetingRouter.useMutation({
                onError:(err) => {
                    
          
                    if (err instanceof ZodError) {
                        toast.error(err.issues[0].message)
                        return
                    }
          
                    toast.error("Etwas ist schief gelaufen")
                },
                onSuccess: ({}) => {
                    toast.success("Bericht wurde erfolgreich gespeichert")
                    router.push("/")
                }
            })  */

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {" "}
      <Box>
        <input
          type="hidden"
          value={id} // Hidden value that will be passed
          {...register("id")}
        />

        <input
          type="hidden"
          value={type} // Hidden value that will be passed
          {...register("type")}
        />

        <h2 className="text-asoftnet-900 font-semibold text-center m-3">
          Aufgaben:
        </h2>

        {fields.map((field, index) => (
          <div key={field.id} className="bg-asoftnet-100 rounded-md mt-4">
            <FormControl sx={{ p: 1, mt: 1, ml: 1, width: "33%" }}>
              <TextField {...register(`tasks.${index}.topic`)} label="Thema" />
            </FormControl>

            <FormControl sx={{ p: 1, mt: 1, width: "33%" }}>
              <LocalizationProvider
                dateAdapter={AdapterLuxon}
                adapterLocale="de"
              >
                {existingTasks[index] ? (
                  <DatePicker
                    label="Fälligkeit"
                    value={DateTime.fromISO(existingTasks[index].due_date)}
                    {...register(`tasks.${index}.due_date`, {
                      required: "Date is required",
                    })}
                    onChange={(time) =>
                      setValue(`tasks.${index}.due_date`, time)
                    } // Set value manually
                  />
                ) : (
                  <DatePicker
                    label="Fälligkeit"
                    {...register(`tasks.${index}.due_date`, {
                      required: "Date is required",
                    })}
                    onChange={(time) =>
                      setValue(`tasks.${index}.due_date`, time)
                    } // Set value manually
                  />
                )}
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ p: 1, mt: 1, width: "33%" }}>
              <InputLabel>Status</InputLabel>

              {existingTasks[index] ? (
                <Select
                  label="Status"
                  {...register(`tasks.${index}.status`)}
                  defaultValue={existingTasks[index].status}
                  //helperText={fullErrors.activation?.[index]?.protocol?.message}
                  error={!!errors.tasks?.[index]?.message}
                >
                  <MenuItem value={"to_do"}>Offen</MenuItem>
                  <MenuItem value={"done"}>Erledigt</MenuItem>
                  <MenuItem value={"postponed"}>Verschoben</MenuItem>
                </Select>
              ) : (
                <Select
                  label="Protokoll"
                  {...register(`tasks.${index}.status`)}
                  defaultValue={"to_do"}
                  //helperText={fullErrors.activation?.[index]?.protocol?.message}
                  error={!!errors.tasks?.[index]?.message}
                >
                  <MenuItem value={"to_do"}>Offen</MenuItem>
                  <MenuItem value={"done"}>Erledigt</MenuItem>
                  <MenuItem value={"postponed"}>Verschoben</MenuItem>
                </Select>
              )}
            </FormControl>
            <FormControl sx={{ p: 1, ml: 1, width: "39%" }}>
              <TextField
                {...register(`tasks.${index}.accountable`)}
                label="Verantwortliche"
              />
            </FormControl>
            <FormControl sx={{ p: 1, width: "60%" }}>
              <TextField
                multiline
                {...register(`tasks.${index}.content`)}
                label="Inhalt"
              />
            </FormControl>

            <Stack
              direction="row"
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: 2,
              }}
            >
              <IconButton
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                color="error"
              >
                <DeleteForeverRounded />
              </IconButton>
            </Stack>
          </div>
        ))}
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            paddingRight: 2,
          }}
        >
          <IconButton
            size="large"
            sx={{ width: "fit-content" }}
            onClick={() => {
              setArrayValues(
                arrayValues.concat({
                  topic: "",
                  content: "",
                  accountable: "",
                  due_date: new Date(),
                  status: "to_do",
                }),
              );
              append({
                topic: "",
                content: "",
                accountable: "",
                due_date: new Date(),
                status: "to_do",
              });
            }}
            color="success"
          >
            <AddCircleOutlineRounded />
          </IconButton>
        </Stack>

        <div className="text-center">
          <Button variant="contained" type="submit">
            {" "}
            Bericht aktualisieren
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default MeetingProtocolEdit;
