"use client";

import { useState } from "react";

export function RegisterForm() {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const res = await fetch("/api/auth/register", { method: "POST", body: form });
        setMessage(res.ok ? "Account created. Please login." : "Failed to create account.");
      }}
    >
      <input name="displayName" placeholder="Display name" className="w-full rounded border border-white/20 bg-card p-2" required />
      <input name="email" type="email" placeholder="Email" className="w-full rounded border border-white/20 bg-card p-2" required />
      <input name="password" type="password" placeholder="Password" className="w-full rounded border border-white/20 bg-card p-2" required minLength={8} />
      {message && <p className="text-sm text-white/70">{message}</p>}
      <button className="w-full rounded bg-accent p-2 font-medium">Create account</button>
    </form>
  );
}
