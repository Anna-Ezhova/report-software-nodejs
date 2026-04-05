"use client";

import {
  BcixAlertValidator,
  TBcixValidator,
} from "@/lib/validators/forms/soc-forms-validators";

import { toast } from "sonner";
import { ZodError } from "zod";
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

import { User } from "@/payload-types";

import { alarmBcix } from "@/server/soc.server";

interface userName {
  user: User;
  token: string | undefined;
}

const BcixAlertForm = ({ user, token }: userName) => {
  const id = null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TBcixValidator>({
    resolver: zodResolver(BcixAlertValidator),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<TBcixValidator> = async ({
    eventType,
    priority,
    summary,
    details,
    alertKey,
  }: TBcixValidator) => {
    const { success, message, errors } = await alarmBcix(
      { eventType, priority, summary, details, alertKey },
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

    /*  if (origin) {
            router.push(`/${origin}`)
            return
          } */

    router.push("/");
    return;
  };

  return (
    <Box>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <InputLabel>Typ des Alarms</InputLabel>
        <Select
          label="eventType"
          {...register("eventType")}
          error={!!errors.eventType}
          defaultValue={""}
          //  onChange={handleChange}
        >
          <MenuItem value={"ALERT"}>ALERT</MenuItem>
          <MenuItem value={"ACCEPT"}>ACCEPT</MenuItem>
          <MenuItem value={"RESOLVE"}>RESOLVE</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <InputLabel>Priorität</InputLabel>
        <Select
          label="priority"
          {...register("priority")}
          error={!!errors.priority}
          defaultValue={""}
          //  onChange={handleChange}
        >
          <MenuItem value={"LOW"}>LOW</MenuItem>
          <MenuItem value={"HIGH"}>HIGH</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField {...register(`alertKey`)} label="Ticketnummer" />
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField {...register(`summary`)} label="Ticketnummer" />
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField
          multiline
          {...register("details")}
          label="Teilnehmer Extern"
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

export default BcixAlertForm;
