import * as z from "zod";

export const inkBrushHeaderSchema = z.object({
  component: z.string(),
  lang: z.string(),
  mode: z.enum(["view", "edit"]),
});

export type InkBrushHeaderSchemaType = z.infer<typeof inkBrushHeaderSchema>;
