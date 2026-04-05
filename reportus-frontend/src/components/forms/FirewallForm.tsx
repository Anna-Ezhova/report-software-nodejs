"use client";
import {
  AddFirewallValidator,
  TAddFirewallValidator,
} from "@/lib/validators/forms/forms-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useFieldArray,
  useForm,
  Controller,
  useWatch,
  SubmitHandler,
} from "react-hook-form";

import React, { useEffect, useState } from "react";

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
  ContentCopy,
  DeleteForever,
  DeleteForeverRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { ZodError } from "zod";
import { toast } from "sonner";

interface UserName {
  username: string;
}

interface firewallObject {
  source: string;
  destination: string;
  service: string;
  protocol: "TCP" | "TCP/UDP" | "UPD";
  port: string;
}

const FirewallForm = ({ username }: UserName) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TAddFirewallValidator>({
    resolver: zodResolver(AddFirewallValidator),
  });

  const fullErrors: FieldErrors<
    Extract<TAddFirewallValidator, { priority: "4" | "5" }>
  > = errors;
  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "activation",
  });

  useEffect(() => {
    replace([
      { source: "", destination: "", service: "", protocol: "TCP", port: "" },
    ]);
  }, [replace]);

  const [arrayValues, setArrayValues] = React.useState<firewallObject[]>([
    { source: "", destination: "", service: "", protocol: "TCP", port: "" },
  ]);

  const [prio, setPrio] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPrio(event.target.value as string);
  };

  const router = useRouter();

  /* const {mutate, isLoading} = trpc.forms.firewallRouter.useMutation({
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
    Extract<TAddFirewallValidator, { priority: "4" | "5" }>
  > = (data) => {
    const { user, priority, reason, activation } = data;
    var priorityReason = "";
    if (data.priorityReason) {
      priorityReason = data.priorityReason;
    }

    // mutate({user, priority, priorityReason, reason, activation})
  };

  return (
    <Box>
      <FormControl sx={{ p: 2, width: "33%" }}>
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

      <FormControl sx={{ p: 2, width: "33%" }}>
        <InputLabel>Priorität</InputLabel>
        <Select
          label="priority"
          {...register("priority")}
          defaultValue={"1"}
          onChange={handleChange}
        >
          <MenuItem value={"1"}>sehr niedrig</MenuItem>
          <MenuItem value={"2"}>niedrig</MenuItem>
          <MenuItem value={"3"}>normal</MenuItem>
          <MenuItem value={"4"}>hoch</MenuItem>
          <MenuItem value={"5"}>kritisch</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ p: 2, width: "33%" }}>
        {" "}
        <TextField
          label="Begründung"
          multiline
          {...register("reason")}
          helperText={fullErrors.reason?.message}
          error={!!fullErrors.reason}
        />
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

      {fields.map((field, index) => (
        <div key={field.id} className="">
          <FormControl sx={{ p: 1, width: "20%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register(`activation.${index}.source`)}
              label="Source"
              helperText={fullErrors.activation?.[index]?.source?.message}
              error={!!fullErrors.activation?.[index]?.source?.message}
            />
          </FormControl>
          <FormControl sx={{ p: 1, width: "20%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register(`activation.${index}.destination`)}
              label="Destination"
              helperText={fullErrors.activation?.[index]?.destination?.message}
              error={!!fullErrors.activation?.[index]?.destination?.message}
            />
          </FormControl>
          <FormControl sx={{ p: 1, width: "20%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register(`activation.${index}.port`)}
              label="Port"
              helperText={fullErrors.activation?.[index]?.port?.message}
              error={!!fullErrors.activation?.[index]?.port?.message}
            />
          </FormControl>

          <FormControl sx={{ p: 1, width: "20%" }}>
            <InputLabel>Protokoll</InputLabel>
            <Select
              label="Protokoll"
              {...register(`activation.${index}.protocol`)}
              defaultValue={"TCP"}
              //helperText={fullErrors.activation?.[index]?.protocol?.message}
              error={!!fullErrors.activation?.[index]?.protocol?.message}
            >
              <MenuItem value={"TCP"}>TCP</MenuItem>
              <MenuItem value={"TCP/UDP"}>TCP/UDP</MenuItem>
              <MenuItem value={"UDP"}>UDP</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ p: 1, width: "20%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register(`activation.${index}.service`)}
              label="Dienst"
              helperText={fullErrors.activation?.[index]?.service?.message}
              error={!!fullErrors.activation?.[index]?.service?.message}
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
            {/* <IconButton 
                 onClick={() => { 
                    setArrayValues(arrayValues.concat({source: arrayValues[index].source,
                        destination: arrayValues[index].destination,
                        service: arrayValues[index].service,
                        protocol: arrayValues[index].protocol,
                        port: arrayValues[index].port
                }))
                    append({source: arrayValues[index].source,
                        destination: arrayValues[index].destination,
                        service: arrayValues[index].service,
                        protocol: arrayValues[index].protocol,
                        port: arrayValues[index].port
                    })}} color="error">
                    <ContentCopy/>
                </IconButton> */}
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
                source: "",
                destination: "",
                service: "",
                protocol: "TCP",
                port: "",
              }),
            );
            append({
              source: "",
              destination: "",
              service: "",
              protocol: "TCP",
              port: "",
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

export default FirewallForm;
