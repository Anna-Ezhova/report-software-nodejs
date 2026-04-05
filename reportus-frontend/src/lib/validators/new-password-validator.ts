import { z } from "zod";

export const PassValidator = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, { message: "Das Passwort sollte mind. 8 Zeichen beinhalten" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Das Passwort sollte mind. 8 Zeichen beinhalten" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Eingegebene Passwörter stimmen nicht überein",
      });
    }
  });

export type TPassValidator = z.infer<typeof PassValidator>;
