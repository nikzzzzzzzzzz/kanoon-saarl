import { z } from "zod";

export const simplifyRequestSchema = z.object({
  text: z.string().min(1, "Text is required").max(10000, "Text too long"),
  type: z.enum(["text", "image"]).default("text"),
});

export const simplifyResponseSchema = z.object({
  simplified: z.string(),
  originalText: z.string(),
  processingTime: z.number().optional(),
});

export type SimplifyRequest = z.infer<typeof simplifyRequestSchema>;
export type SimplifyResponse = z.infer<typeof simplifyResponseSchema>;

// No database models needed for this application as it's stateless
