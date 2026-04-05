import { z } from "zod";


export const SearchString = z.object({
  keywordString: z.string()
});

export type TSearchString = z.infer<typeof SearchString>;
