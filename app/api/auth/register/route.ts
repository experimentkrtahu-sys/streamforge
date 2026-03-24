import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { consumeRateLimit } from "@/lib/security/rate-limit";
import { registerSchema } from "@/lib/validation/auth";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!consumeRateLimit(`register:${ip}`, 10).allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const form = await req.formData();
  const parsed = registerSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: "Email exists" }, { status: 409 });

  const passwordHash = await hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash,
      profile: { create: { displayName: parsed.data.displayName } }
    }
  });

  return NextResponse.json({ ok: true });
}
