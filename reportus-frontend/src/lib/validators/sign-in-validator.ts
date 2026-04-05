import { z } from "zod";

export const SignInValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Das Passwort sollte mind. 8 Zeichen beinhalten" }),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;
