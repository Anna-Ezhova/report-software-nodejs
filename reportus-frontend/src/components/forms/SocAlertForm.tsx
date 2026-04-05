"use client";

import {
  SocAlertValidator,
  SocRegularValidator,
  TSocAlert,
  TSocRegularValidator,
} from "@/lib/validators/forms/soc-forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

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
import { Customer, User } from "@/payload-types";
const { DateTime } = require("luxon");
import { createAlert } from "@/server/soc.server";
import { useEffect, useState } from "react";

interface userName {
  user: User;
  token: string | undefined;
}

const SocAlertForm = ({ user, token }: userName) => {
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users?depth=0&where[or][0][and][0][role][equals]=manager_soc`;
  const url1 = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/customers?depth=0&where[or][0][and][0][_status][equals]=active`;

  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
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

  useEffect(() => {
    // Fetch users from Payload CMS API using fetch
    fetch(url1, {
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
        setCustomers(data.docs); // Assuming the response contains the list of users
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [url1]);

  const id = null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TSocAlert>({
    resolver: zodResolver(SocAlertValidator),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<TSocAlert> = async ({
    employee,
    date,
    time,
    events,
    customer,
  }: TSocAlert) => {
    const { success, message, errors } = await createAlert(
      { employee, date, time, events, customer },
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
  return (
    <Box>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <InputLabel>Schichtleiter</InputLabel>
        <Select
          label="Protokollführer"
          {...register("employee")}
          defaultValue={""}
          error={!!errors.employee}
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
      <FormControl sx={{ p: 1, width: "50%" }}>
        <InputLabel>Kunde</InputLabel>
        <Select
          label="Kunde"
          {...register("customer")}
          defaultValue={""}
          error={!!errors.employee}
          //  onChange={handleChange}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            customers.map((customer) => (
              <MenuItem key={customer.id} value={`${customer.id}`}>
                {" "}
                {`${customer.name}`}{" "}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            label="Datum"
            {...register("date", { required: "Date is required" })}
            onChange={(time) => setValue("date", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <TimePicker
            label="Zeit"
            {...register("time", { required: "Date is required" })}
            onChange={(time) => setValue("time", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ p: 1, width: "100%" }}>
        <TextField multiline {...register("events")} label="Ablauf" />
      </FormControl>

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

export default SocAlertForm;
