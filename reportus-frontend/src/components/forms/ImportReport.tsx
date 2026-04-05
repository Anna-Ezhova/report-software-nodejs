"use client";

import {
  ImportReportValidator,
  TImportReportValidator,
} from "@/lib/validators/forms/admin";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const ImportReport = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TImportReportValidator>({
    resolver: zodResolver(ImportReportValidator),
  });

  /*    const {mutate, isLoading} = trpc.admin.importReport.useMutation({
      onError:(err) => {
          

          if (err instanceof ZodError) {
              toast.error(err.issues[0].message)
              return
          }

          toast.error("Etwas ist schief gelaufen")
      },
      onSuccess: ({}) => {
          toast.success("Alle Berichte wurden erfolgreich importiert")
          
      }
  }) */

  const onSubmit: SubmitHandler<TImportReportValidator> = (data) => {
    const { type } = data;

    // mutate({type})
  };

  return (
    <div className="justify-center">
      <div className="text-xl p-5 m-4 bg-slate-200 rounded">
        Bitte die Berichte, die JSONs, die importiert werden sollen ins
        Verzeichnis{" "}
        <span className="font-semibold text-asoftnet-800">
          &quot;/public/toImport&quot;
        </span>
        platzieren.
      </div>

      <Box sx={{ p: 2 }}>
        <FormControl sx={{ p: 2, width: "50%" }}>
          <InputLabel>Typ der Berichte</InputLabel>
          <Select
            label="typr"
            {...register("type")}
            defaultValue={"soc_generic"}
          >
            <MenuItem value={"soc_generic"}>Ereignisberichte SOC</MenuItem>
            <MenuItem value={"soc_alert"} disabled>
              Notfallberichte SOC
            </MenuItem>
            <MenuItem value={"soc_visitors"}>Besucherprotokolle SOC</MenuItem>
          </Select>

          <Stack
            direction="row"
            sx={{
              p: 2,
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
        </FormControl>
      </Box>
    </div>
  );
};

export default ImportReport;
