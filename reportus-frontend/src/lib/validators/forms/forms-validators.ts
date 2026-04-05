import { PriorityIdKeys } from "../../../config/otoboData";
import { z } from "zod";

const certTypes = [
  "Webserver",
  "Proxy",
  "Firewall",
  "Switch",
  "Sonstiges",
] as const;
const countries = ["DE"] as const;
const organisations = ["ASOFTNET"] as const;
const states = ["Thüringen", "Hamburg", "Nordrhein-Westfalen"] as const;
const priorityNoReason = ["1", "2", "3"] as const;
const priorityReasonNeeded = ["4", "5"] as const;

const priorityChange = ["6", "7"] as const;

const protocols = ["TCP", "TCP/UDP", "UDP"] as const;

const locations = [
  "Geschäftsführungraum",
  "Besprechungsraum",
  "Verwaltungsbüro",
  "Teams",
  "Arbeitsplatz",
] as const;
const topics = ["weekly", "verwaltung"] as const;
const status = ["to_do", "done", "postponed"] as const;

const priorityReason = z.discriminatedUnion("priority", [
  z.object({
    priority: z.enum(priorityReasonNeeded),
    priorityReason: z.string().min(1),
  }),
  z.object({
    priority: z.enum(priorityNoReason),
  }),
]);

const priorityReasonChange = z.discriminatedUnion("priority", [
  z.object({
    priority: z.enum(priorityChange),
    priorityReason: z.string().min(1),
  }),
  z.object({
    priority: z.literal("8"),
  }),
]);

export const firewallActivation = z.object({
  source: z.string().min(1),
  destination: z.string().min(1),
  port: z.string().min(1),
  protocol: z.enum(protocols),
  service: z.string().min(1),
});

// const severalDnsValidator = z.discriminatedUnion(());

export const AddCertValidator = z
  .object({
    user: z.string().min(1),
    type: z.enum(certTypes),
    country: z.enum(countries),
    state: z.enum(states),
    organisation: z.enum(organisations),
    name: z.string().min(1),
    ip: z.string(),
    dns: z.array(
      z.object({
        name: z.string().min(1),
      }),
    ),
  })
  .and(priorityReason);

export type TAddCertValidator = z.infer<typeof AddCertValidator>;

export const AddFirewallValidator = z
  .object({
    user: z.string().min(1),
    activation: z.array(firewallActivation),
    reason: z.string().min(1),
  })
  .and(priorityReason);

export type TAddFirewallValidator = z.infer<typeof AddFirewallValidator>;

export const RevokeCertValidator = z
  .object({
    user: z.string().min(1),
    name: z.string().min(1),
    reason: z.string(),
    time: z.coerce.date(),
  })
  .and(priorityReason);

export type TRevokeCertValidator = z.infer<typeof RevokeCertValidator>;

export const MountServer = z
  .object({
    user: z.string().min(1),
  })
  .and(priorityReason);

export type TMountServer = z.infer<typeof MountServer>;

export const DemountServer = z
  .object({
    user: z.string().min(1),
  })
  .and(priorityReason);

export type TDemountServer = z.infer<typeof DemountServer>;

export const Onboarding = z
  .object({
    user: z.string().min(1),
  })
  .and(priorityReason);

export type TOnboarding = z.infer<typeof Onboarding>;

export const NewChange = z
  .object({
    user: z.string().min(1),
  })
  .and(priorityReasonChange);

export type TNewChange = z.infer<typeof NewChange>;

export const PostFormValidator = z.object({
  serial_number: z.string(),
  date_of_record: z.coerce.date(),
  date_of_letter: z.coerce.date(),
  recipient: z.string(),
  subject: z.string(),
  notes: z.string().optional(),
});

export type TPostFormValidator = z.infer<typeof PostFormValidator>;

export const TaskValidator = z.object({
  topic: z.string(),
  content: z.string(),
  accountable: z.string(),
  due_date: z.coerce.date(),
  status: z.enum(status),
});

export const TaskFormValidator = z.object({
  id: z.string(),
  type: z.enum(topics),
  tasks: z.array(TaskValidator),
});

export type TTaskFormValidator = z.infer<typeof TaskFormValidator>;

export const MeetingProtocolValidator = z.object({
  organizer: z.string(),
  date: z.coerce.date(),
  location: z.enum(locations),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  /* participants_intern: z.array(
        z.object({
            participant: z.string()
        })
    ), */
  participants_intern: z.string(),
  participants_extern: z.string().optional(),
  topic: z.enum(topics),
  tasks: z.array(TaskValidator),
  notes: z.string().optional(),
});

export type TMeetingProtocolValidator = z.infer<
  typeof MeetingProtocolValidator
>;
