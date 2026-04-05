"use client";

import {
  Onboarding,
  TOnboarding,
} from "@/lib/validators/forms/forms-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

interface UserName {
  user: string;
}

const OnboardingForm = ({ user }: UserName) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TOnboarding>({
    resolver: zodResolver(Onboarding),
  });

  const fullErrors: FieldErrors<Extract<TOnboarding, { priority: "4" | "5" }>> =
    errors;
  const [username, setUsername] = React.useState(user);
  const [prio, setPrio] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setPrio(event.target.value as string);
  };

  /*  const {fields, replace, append, remove} = useFieldArray({
        control,
        name: "activation"
    })

    useEffect(() => {
        replace([{source: "",
            destination: "",
            service: "",
            protocol: "TCP",
            port: ""
        }]);
        
    }, [replace]) */

  const router = useRouter();

  /* const {mutate, isLoading} = trpc.forms.onboardingRouter.useMutation({
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
    Extract<TOnboarding, { priority: "4" | "5" }>
  > = (data) => {
    //TODO
    /* const {user, priority, type, country, state, organisation, name, ip, dns} = data
        var priorityReason = ""
        if (data.priorityReason) {
          priorityReason = data.priorityReason
        }
    
          mutate({user, priority, type, priorityReason, country, state, organisation, name, ip, dns})*/
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

      {/* TODO  */}
    </Box>
  );
};

export default OnboardingForm;
