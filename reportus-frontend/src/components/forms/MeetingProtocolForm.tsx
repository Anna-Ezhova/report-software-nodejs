"use client";

import {
  MeetingProtocolValidator,
  TMeetingProtocolValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import TextField from "@mui/material/TextField";
import {
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
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
import { newMeeting } from "@/server/management.server";
const { DateTime } = require("luxon");

interface userName {
  user: User;
  token: string | undefined;
}

interface taskObject {
  topic: string;
  content: string;
  accountable: string | undefined;
  due_date: string | Date | undefined;
  status: "to_do" | "done" | "postponed";
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

const MeetingProtocolForm = ({ user, token }: userName) => {
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TMeetingProtocolValidator>({
    resolver: zodResolver(MeetingProtocolValidator),
  });

  const router = useRouter();

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });
  /* 
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([""]);
  
    const handleChange = (event: SelectChangeEvent) => {
      const {
        target: { value },
      } = event;
      
      // Update both the internal state and the React Hook Form state
      setPersonName(typeof value === "string" ? value.split(",") : value);
      setValue("participants_intern", typeof value === "string" ? value.split(",") : value);  // Synchronize with RHF
    }; */

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
    replace([
      {
        topic: "",
        content: "",
        accountable: "",
        due_date: new Date(),
        status: "to_do",
      },
    ]);
  }, [replace]);

  //  const onSubmit: SubmitHandler<TMeetingProtocolValidator> = (data) => {
  const onSubmit: SubmitHandler<TMeetingProtocolValidator> = async (data) => {
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
    } = data;

    const { success, message, errors } = await newMeeting(
      {
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
      },
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

  /* const {mutate, isLoading} = trpc.forms.newMeetingRouter.useMutation({
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
    <Box>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            label="Datum"
            {...register("date", { required: "Date is required" })}
            onChange={(time) => setValue("date", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ p: 1, width: "33%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <TimePicker
            label="Beginn"
            {...register("start_time", { required: "Date is required" })}
            onChange={(time) => setValue("start_time", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <TimePicker
            label="Ende"
            {...register("end_time", { required: "Date is required" })}
            onChange={(time) => setValue("end_time", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <InputLabel>Organisator</InputLabel>
        <Select
          label="Protokollführer"
          {...register("organizer")}
          defaultValue={""}
          error={!!errors.organizer}
          //  onChange={handleChange}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            users.map((user) => (
              <MenuItem key={user.id} value={`${user.id}`}>
                {" "}
                {`${user.first_name} ${user.last_name}`}{" "}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <FormControl sx={{ p: 1, width: "33%" }}>
        <InputLabel>Ort</InputLabel>
        <Select
          label="location"
          {...register("location")}
          error={!!errors.location}
          defaultValue={"Besprechungsraum"}
          //  onChange={handleChange}
        >
          <MenuItem value={"Geschäftsführungraum"}>
            Geschäftsführungraum
          </MenuItem>
          <MenuItem value={"Besprechungsraum"}>Besprechungsraum</MenuItem>
          <MenuItem value={"Verwaltungsbüro"}>Verwaltungsbüro</MenuItem>
          <MenuItem value={"Teams"}>Teams</MenuItem>
          <MenuItem value={"Arbeitsplatz"}>Arbeitsplatz</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ p: 1, width: "33%" }}>
        <InputLabel>Thema</InputLabel>
        <Select
          label="priority"
          {...register("topic")}
          defaultValue={"weekly"}
          error={!!errors.topic}
          //  onChange={handleChange}
        >
          <MenuItem value={"weekly"}>Weekly Meetings</MenuItem>
          <MenuItem value={"verwaltung"}>Verwaltungsmeeting</MenuItem>
          {/* <MenuItem value={"sonstiges"}>Sonstiges</MenuItem> */}
        </Select>
      </FormControl>

      {/* <FormControl sx={{ p: 1, width: "50%" }}>
    <InputLabel id="demo-multiple-name-label">Teilnehmer Intern</InputLabel>
    <Controller
      name="participants_intern" // The field in form state
      control={control} // Bind it to RHF control
      
      
      render={({ field }) => (
        <Select
          {...field} // Use value and onChange from React Hook Form
          labelId="demo-multiple-name-label"
          id="demo-multiple-name" error={!!errors.participants_intern}
          multiple
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          value={personName} // Use the internal state for the value
          onChange={(event) => {
            handleChange(event); // Handle both the internal state and RHF state
            field.onChange(event); // Also update React Hook Form's internal state
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)} // Update with the current selection
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    
  </FormControl> */}
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField
          multiline
          {...register("participants_intern")}
          label="Teilnehmer Intern"
        />
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField
          multiline
          {...register("participants_extern")}
          label="Teilnehmer Extern"
        />
      </FormControl>

      <h2 className="text-asoftnet-900 font-semibold text-center m-3">
        Aufgaben:
      </h2>

      {fields.map((field, index) => (
        <div key={field.id} className="bg-asoftnet-100 rounded-md mt-4">
          <FormControl sx={{ p: 2, width: "50%" }}>
            <TextField {...register(`tasks.${index}.topic`)} label="Thema" />
          </FormControl>

          <FormControl sx={{ p: 2, width: "50%" }}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
              <DatePicker
                label="Fälligkeit"
                {...register(`tasks.${index}.due_date`, {
                  required: "Date is required",
                })}
                onChange={(time) => setValue(`tasks.${index}.due_date`, time)} // Set value manually
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ p: 2, width: "100%" }}>
            <TextField
              {...register(`tasks.${index}.accountable`)}
              label="Verantwortliche"
            />
          </FormControl>
          <FormControl sx={{ p: 2, width: "100%" }}>
            <TextField
              multiline
              {...register(`tasks.${index}.content`)}
              label="Inhalt"
            />
          </FormControl>

          <FormControl sx={{ p: 2, width: "40%" }}>
            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="to_do"
              {...register(`tasks.${index}.status`)}
            >
              <FormControlLabel
                value="to_do"
                control={<Radio />}
                label="offen"
              />
              <FormControlLabel
                value="done"
                control={<Radio />}
                label="erledigt"
              />
              <FormControlLabel
                value="postponed"
                control={<Radio />}
                label="verschoben"
              />
            </RadioGroup>
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

      <Stack
        direction="row"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 2,
        }}
      >
        <Button
          variant="contained"
          //@ts-ignore
          onClick={handleSubmit(onSubmit)}
        >
          {" "}
          Absenden{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default MeetingProtocolForm;
