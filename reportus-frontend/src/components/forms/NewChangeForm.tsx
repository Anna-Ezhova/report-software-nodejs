"use client";

import { NewChange, TNewChange } from "@/lib/validators/forms/forms-validators";

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

const NewChangeForm = ({ user }: UserName) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TNewChange>({
    resolver: zodResolver(NewChange),
  });

  const fullErrors: FieldErrors<Extract<TNewChange, { priority: "6" | "7" }>> =
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

  /* const {mutate, isLoading} = trpc.forms.newChangeRouter.useMutation({
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
  const onSubmit: SubmitHandler<
    Extract<TNewChange, { priority: "4" | "5" }>
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
          defaultValue={"8"}
          onChange={handleChange}
          error={!!fullErrors.priority}
        >
          <MenuItem value={"8"}>Normaler Change</MenuItem>
          <MenuItem value={"7"}>Standard Change</MenuItem>
          <MenuItem value={"6"}>Notfall Change</MenuItem>
        </Select>
      </FormControl>

      {prio === "7" || prio === "6" ? (
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

export default NewChangeForm;
