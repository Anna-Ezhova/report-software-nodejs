import { coerce, z } from "zod";

const shifts = ["0", "1", "2"] as const;

export const SocRegularValidator = z.object({
  lead: z.string(),
  employees: z.string(),
  date: z.coerce.date(),
  shift: z.enum(shifts),
  events: z.string(),
  special_events: z.string().optional(),
});

export type TSocRegularValidator = z.infer<typeof SocRegularValidator>;

export const SocRegularValidatorDisplay = SocRegularValidator.extend({
  date: z.string(),
});

export type TSocDisplay = z.infer<typeof SocRegularValidatorDisplay>;

export const SocAlertValidator = z.object({
  employee: z.string(),
  date: z.coerce.date(),
  time: z.coerce.date(),
  customer: z.string(),
  events: z.string(),
});

export type TSocAlert = z.infer<typeof SocAlertValidator>;

export const SocVisitorValidator = z.object({
  employee: z.string(),
  date: z.coerce.date(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  reason: z.string(),
});

export type TSocVisitor = z.infer<typeof SocVisitorValidator>;

const eventTypes = ["ALERT", "ACCEPT", "RESOLVE"] as const;
const priority = ["HIGH", "LOW"] as const;

export const BcixAlertValidator = z.object({
  eventType: z.enum(eventTypes),
  priority: z.enum(priority),
  alertKey: z.string(),
  summary: z.string(),
  details: z.string(),
});

export type TBcixValidator = z.infer<typeof BcixAlertValidator>;
