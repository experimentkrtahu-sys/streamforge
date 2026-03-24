import { ShowStatus, ShowType } from "@prisma/client";
import { z } from "zod";

export const showSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  synopsis: z.string().min(20),
  releaseYear: z.coerce.number().int().min(1950).max(2100),
  status: z.nativeEnum(ShowStatus),
  type: z.nativeEnum(ShowType),
  language: z.string().min(2),
  totalEpisodes: z.coerce.number().int().min(1),
  posterUrl: z.string().url(),
  bannerUrl: z.string().url().optional().or(z.literal(""))
});
