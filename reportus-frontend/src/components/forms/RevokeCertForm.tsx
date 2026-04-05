"use client";
import {
  RevokeCertValidator,
  TRevokeCertValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserName {
  user: string;
}

const RevokeCertForm = ({ user }: UserName) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TRevokeCertValidator>({
    resolver: zodResolver(RevokeCertValidator),
  });

  const fullErrors: FieldErrors<
    Extract<TRevokeCertValidator, { priority: "4" | "5" }>
  > = errors;

  const [username, setUsername] = React.useState(user);
  const [prio, setPrio] = React.useState("");

  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setPrio(event.target.value as string);
  };

  /* const {mutate, isLoading} = trpc.forms.revokeCertRouter.useMutation({
        onError:(err) => {
            
  
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }
  
            toast.error("Etwas ist schief gelaufen")
        },
        onSuccess: ({}) => {
            toast.success("Ticket wurde erfolgreich erstellt")
            router.push("/")
        }
    }) */

  const onSubmit: SubmitHandler<
    Extract<TRevokeCertValidator, { priority: "4" | "5" }>
  > = (data) => {
    const { user, priority, name, reason, time } = data;

    var priorityReason = "";
    if (data.priorityReason) {
      priorityReason = data.priorityReason;
    }

    /* s */
  };

  return (
    <Box>
      <FormControl sx={{ p: 2, width: "50%" }}>
        <TextField
          label="User"
          defaultValue={username}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          {...register("user")}
          helperText={fullErrors.user?.message}
          error={!!fullErrors.user}
        />
      </FormControl>

      <FormControl sx={{ p: 2, width: "50%" }}>
        <InputLabel>Priorität</InputLabel>
        <Select
          label="priority"
          {...register("priority")}
          defaultValue={"1"}
          onChange={handleChange}
          error={!!fullErrors.priority}
        >
          <MenuItem value={"1"}>sehr niedrig</MenuItem>
          <MenuItem value={"2"}>niedrig</MenuItem>
          <MenuItem value={"3"}>normal</MenuItem>
          <MenuItem value={"4"}>hoch</MenuItem>
          <MenuItem value={"5"}>kritisch</MenuItem>
        </Select>
      </FormControl>

      {prio === "4" || prio === "5" ? (
        <FormControl fullWidth sx={{ p: 2 }}>
          {" "}
          <TextField
            label="Begründung Priorität"
            multiline
            {...register("priorityReason")}
            helperText={fullErrors.priorityReason?.message}
            error={!!fullErrors.priorityReason}
          />
        </FormControl>
      ) : null}

      <FormControl sx={{ p: 2, width: "50%" }}>
        <TextField
          label="Zertifikatsname (FQDN)"
          {...register("name")}
          helperText={fullErrors.name?.message}
          error={!!fullErrors.name}
        />
      </FormControl>
      <FormControl fullWidth sx={{ p: 2, width: "50%" }}>
        <InputLabel>Begründung</InputLabel>
        <Select
          label="reason"
          {...register("reason")}
          defaultValue={"Zertifikat ausgelaufen"}
          error={!!fullErrors.reason}
        >
          <MenuItem value={"Zertifikat ausgelaufen"}>
            Zertifikat ausgelaufen
          </MenuItem>
          <MenuItem value={"Zertifikat ersetzt"}>Zertifikat ersetzt</MenuItem>
          <MenuItem value={"Schlüssel kompromitiert"}>
            Schlüssel kompromitiert
          </MenuItem>
          <MenuItem value={"Zertifizierungsstelle kompromitiert"}>
            Zertifizierungsstelle kompromitiert
          </MenuItem>
          <MenuItem value={"Zuordnung geändert"}>Zuordnung geändert</MenuItem>
          <MenuItem value={"Zertifikat abgelöst"}>Zertifikat abgelöst</MenuItem>
          <MenuItem value={"Zertifikat blockiert"}>
            Zertifikat blockiert
          </MenuItem>
          <MenuItem value={"Vorgangsende"}>Vorgangsende</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ p: 2, width: "50%" }}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            label="Sperrdatum"
            {...register("time", { required: "Date is required" })}
            onChange={(time) => setValue("time", time)} // Set value manually
          />
        </LocalizationProvider>
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

export default RevokeCertForm;
