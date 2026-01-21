import * as z from "zod";

export const inkBrushHeaderSchema = z.object({
  component: z.string(),
  lang: z.string(),
});

export type InkBrushHeaderSchemaType = z.infer<typeof inkBrushHeaderSchema>;
