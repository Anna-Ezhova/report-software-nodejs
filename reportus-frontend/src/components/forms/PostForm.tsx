"use client";

import {
  PostFormValidator,
  TPostFormValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Button, Container, IconButton, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import Box from "@mui/material/Box";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { toast } from "sonner";
import { createPostEntry } from "@/server/management.server";

interface token {
  token: string | undefined;
}

const PostForm = ({ token }: token) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TPostFormValidator>({
    resolver: zodResolver(PostFormValidator),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<TPostFormValidator> = async (data) => {
    console.log(data);

    const {
      serial_number,
      date_of_record,
      date_of_letter,
      recipient,
      subject,
    } = data;
    var notes = "";
    if (data.notes) {
      notes = data.notes;
    }

    const { success, message, errors } = await createPostEntry(
      {
        serial_number,
        date_of_record,
        date_of_letter,
        recipient,
        subject,
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

    /* if (origin) {
          router.push(`/${origin}`)
          return
        } */

    router.push("/");
    return;
  };

  return (
    <Box>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <TextField
          label="Lfd. Nr"
          {...register("serial_number")}
          error={!!errors.serial_number}
        />
      </FormControl>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            label="Datum der Eintragung"
            {...register("date_of_record", { required: "Date is required" })}
            onChange={(time) => setValue("date_of_record", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl sx={{ p: 1, width: "33%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            label="Datum des Schreibens"
            {...register("date_of_letter", { required: "Date is required" })}
            onChange={(time) => setValue("date_of_letter", time)} // Set value manually
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField
          label="Empfänger"
          {...register("recipient")}
          error={!!errors.recipient}
        />
      </FormControl>
      <FormControl sx={{ p: 1, width: "50%" }}>
        <TextField
          label="Betreff"
          {...register("subject")}
          error={!!errors.subject}
        />
      </FormControl>

      <FormControl fullWidth sx={{ p: 1 }}>
        {" "}
        <TextField
          label="Bemerkung"
          multiline
          {...register("notes")}
          helperText={errors.notes?.message}
          error={!!errors.notes}
        />
      </FormControl>

      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
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

export default PostForm;
