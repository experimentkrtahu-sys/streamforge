"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { showSchema } from "@/lib/validation/show";

export async function createShowAction(formData: FormData) {
  const parsed = showSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Invalid show payload" };

  await prisma.show.create({
    data: {
      ...parsed.data,
      bannerUrl: parsed.data.bannerUrl || null,
      altTitles: []
    }
  });

  revalidatePath("/admin");
  return { success: true };
}
