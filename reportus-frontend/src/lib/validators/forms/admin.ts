import { z } from "zod";

const ReportTypes = ["soc_generic", "soc_alert", "soc_visitors"] as const;

export const ImportReportValidator = z.object({
  type: z.enum(ReportTypes),
});

export type TImportReportValidator = z.infer<typeof ImportReportValidator>;
