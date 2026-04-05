import { z } from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 3MB
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

// const regex = new RegExp("^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$")

const DEPARTMENTS = [
  "Geschäftsführung",
  "Netzwerk",
  "Server",
  "Entwicklung",
  "SOC",
  "Vertrieb",
  "Buchhaltung",
  "Controling",
  "Generic",
] as const;
const ROLES = [
  "admin",
  "user_general",
  "user_soc",
  "manager_soc",
  "manager_general",
] as const;

export const AuthCredentialsValidator = z.object({
  username: z
    .string()
    .startsWith("IN", { message: "Usernamen sollen standartisiert sein" }),
  first_name: z.string().min(1, {
    message: "Kann nicht leer sein",
  }),
  last_name: z.string().min(1, {
    message: "Kann nicht leer sein",
  }),
  department: z.enum(DEPARTMENTS),
  email: z
    .string()
    .email({
      message: "Kann nicht leer sein",
    })
    .endsWith("asoftnet.de", { message: "Nur Firmenemails benutzen" }),
  password: z
    .string()
    .min(8, { message: "Das Passwort sollte mind. 8 Zeichen beinhalten" }),
  role: z.enum(ROLES),

  /* avatar: z
    .any()
    .optional()
     .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ) 
    */
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
