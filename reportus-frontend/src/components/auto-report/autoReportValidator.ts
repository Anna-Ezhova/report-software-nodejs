import { z } from "zod";

export const AutoReportValidator = z.object({
  alarmId: z.string(),
  task_1: z.coerce.date(),
  task_2: z.coerce.date(),
});

export type TAutoReportValidator = z.infer<typeof AutoReportValidator>;
