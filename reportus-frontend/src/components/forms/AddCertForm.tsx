"use client";
import {
  AddCertValidator,
  TAddCertValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
  useWatch,
  FieldErrors,
} from "react-hook-form";

import TextField from "@mui/material/TextField";
import { Button, Container, IconButton, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { User } from "@/payload-types";
import {
  AddCircleOutlineRounded,
  DeleteForever,
  DeleteForeverRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { ZodError } from "zod";
import { toast } from "sonner";

interface UserName {
  user: string;
}
const AddCertForm = ({ user }: UserName) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAddCertValidator>({
    resolver: zodResolver(AddCertValidator),
  });
  const fullErrors: FieldErrors<
    Extract<TAddCertValidator, { priority: "4" | "5" }>
  > = errors;
  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "dns",
  });

  const onSubmit: SubmitHandler<
    Extract<TAddCertValidator, { priority: "4" | "5" }>
  > = (data) => {
    const {
      user,
      priority,
      type,
      country,
      state,
      organisation,
      name,
      ip,
      dns,
    } = data;
    var priorityReason = "";
    if (data.priorityReason) {
      priorityReason = data.priorityReason;
    }

    // mutate({user, priority, type, priorityReason, country, state, organisation, name, ip, dns})
  };

  const priorityWatch = useWatch({ control, name: "priority" });

  const [username, setUsername] = React.useState(user);
  const [prio, setPrio] = React.useState("");

  useEffect(() => {
    replace([{ name: "" }]);
  }, [replace]);

  const handleChange = (event: SelectChangeEvent) => {
    setPrio(event.target.value as string);
  };

  const router = useRouter();

  /* const {mutate, isLoading} = trpc.forms.newCertRouter.useMutation({
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
  })
   */

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

      <FormControl fullWidth sx={{ p: 2, width: "50%" }}>
        <InputLabel>Zertifikatstyp</InputLabel>
        <Select
          label="type"
          {...register("type")}
          defaultValue={"Webserver"}
          error={!!fullErrors.type}
        >
          <MenuItem value={"Webserver"}>Webserver</MenuItem>
          <MenuItem value={"Proxy"}>Proxy</MenuItem>
          <MenuItem value={"Firewall"}>Firewall</MenuItem>
          <MenuItem value={"Switch"}>Switch</MenuItem>
          <MenuItem value={"Sonstiges"}>Sonstiges</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ p: 2, width: "50%" }}>
        <InputLabel>Land</InputLabel>
        <Select
          label="country"
          {...register("country")}
          defaultValue={"DE"}
          error={!!fullErrors.country}
        >
          <MenuItem value={"DE"}>Deutschland</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ p: 2, width: "50%" }}>
        <InputLabel>Bundesland</InputLabel>
        <Select
          label="state"
          {...register("state")}
          defaultValue={"Thüringen"}
          error={!!fullErrors.state}
        >
          <MenuItem value={"Thüringen"}>Thüringen</MenuItem>
          <MenuItem value={"Hamburg"}>Hamburg</MenuItem>
          <MenuItem value={"Nordrhein-Westfalen"}>Nordrhein-Westfalen</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ p: 2, width: "50%" }}>
        <InputLabel>Organisation</InputLabel>
        <Select
          label="organisation"
          {...register("organisation")}
          defaultValue={"ASOFTNET"}
          error={!!fullErrors.organisation}
        >
          <MenuItem value={"ASOFTNET"}>ASOFTNET</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ p: 2, width: "50%" }}>
        <TextField
          label="Allgemeiner Name"
          {...register("name")}
          helperText={fullErrors.name?.message}
          error={!!fullErrors.name}
        />
      </FormControl>
      <FormControl sx={{ p: 2, width: "50%" }}>
        <TextField
          label="IP Adresse"
          {...register("ip")}
          helperText={fullErrors.ip?.message}
          error={!!fullErrors.ip}
        />
      </FormControl>

      {fields.map((field, index) => (
        <div key={field.id} className="">
          <FormControl sx={{ p: 2 }} fullWidth>
            <TextField
              sx={{ width: "100%" }}
              {...register(`dns.${index}.name`)}
              label="DNS"
              helperText={fullErrors.dns?.[index]?.name?.message}
              error={!!fullErrors.dns?.[index]?.name?.message}
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
          onClick={() => append({ name: "" })}
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
          variant="contained" //@ts-expect-error
          onClick={handleSubmit(onSubmit)}
        >
          {" "}
          Absenden{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCertForm;
