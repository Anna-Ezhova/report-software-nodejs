"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Button, CircularProgress, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { User } from "@/payload-types";
import { useEffect, useState } from "react";
import { createReportGeneric } from "@/server/soc.server";
import { toast } from "sonner";
import {
  SocRegularValidator,
  TSocRegularValidator,
} from "@/lib/validators/forms/soc-forms-validators";
import { LocalizationProvider } from "@mui/x-date-pickers";

interface userName {
  user: User;
  token: string | undefined;
}

const SocGeneralForm = ({ user, token }: userName) => {
  const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users?depth=0&where[or][0][and][0][role][equals]=manager_soc`;

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
  } = useForm<TSocRegularValidator>({
    resolver: zodResolver(SocRegularValidator),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<TSocRegularValidator> = async ({
    lead,
    employees,
    date,
    shift,
    events,
    special_events,
  }: TSocRegularValidator) => {
    const { success, message, errors } = await createReportGeneric(
      { lead, employees, date, shift, events, special_events },
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

    /* if (origin) {
        router.push(`/${origin}`)
        return
      } 
  
      router.push('/')*/
    return;
  };

  /* const onSubmit = ({lead, employees, date, shift, events, special_events} : TSocRegularValidator) => {
      
        console.log(date);
    } */

  return (
    <Box>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <InputLabel>Schichtleiter</InputLabel>
        <Select
          label="Protokollführer"
          {...register("lead")}
          defaultValue={""}
          error={!!errors.lead}
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
        <TextField multiline {...register("employees")} label="Mitarbeiter" />
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
        <InputLabel>Schicht</InputLabel>
        <Select
          label="schift"
          {...register("shift")}
          error={!!errors.shift}
          defaultValue={""}
          //  onChange={handleChange}
        >
          <MenuItem value={"0"}>06:00 - 14:00</MenuItem>
          <MenuItem value={"1"}>14:00 - 22:00</MenuItem>
          <MenuItem value={"2"}>22:00 - 06:00</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ p: 1, width: "100%" }}>
        <TextField multiline {...register("events")} label="Vorkommnisse" />
      </FormControl>
      <FormControl sx={{ p: 1, width: "100%" }}>
        <TextField
          multiline
          {...register("special_events")}
          label="Besondere Vorkommnisse"
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

export default SocGeneralForm;
