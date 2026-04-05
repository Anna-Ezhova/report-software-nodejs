"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { createReportVisitor } from "@/server/soc.server";
import { User } from "@/payload-types";
import {
  SocVisitorValidator,
  TSocVisitor,
} from "@/lib/validators/forms/soc-forms-validators";
const { DateTime } = require("luxon");
interface userName {
  user: User;
  token: string | undefined;
}

const SocVisitorForm = ({ user, token }: userName) => {
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

  const id = null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TSocVisitor>({
    resolver: zodResolver(SocVisitorValidator),
  });

  const router = useRouter();

  const onSubmit = async ({
    employee,
    date,
    start,
    end,
    reason,
  }: TSocVisitor) => {
    const { success, message, errors } = await createReportVisitor(
      { employee, date, start, end, reason },
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

    /*if (origin) {
          router.push(`/${origin}`)
          return
        }*/

    router.push("/");
    return;
  };

  return (
    <Box>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <InputLabel>Mitarbeiter</InputLabel>
        <Select
          label="Mitarbeiter"
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
            label="Beginn"
            {...register("start", { required: "Date is required" })}
            onChange={(time) => setValue("start", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <TimePicker
            label="Ende"
            {...register("end", { required: "Date is required" })}
            onChange={(time) => setValue("end", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ p: 1, width: "100%" }}>
        <TextField multiline {...register("reason")} label="Grund" />
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

export default SocVisitorForm;
