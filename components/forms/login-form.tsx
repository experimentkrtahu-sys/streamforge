"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const result = await signIn("credentials", {
          email: form.get("email"),
          password: form.get("password"),
          redirect: true,
          callbackUrl: "/"
        });
        if (result?.error) setError("Invalid credentials.");
      }}
    >
      <input name="email" type="email" placeholder="Email" className="w-full rounded border border-white/20 bg-card p-2" required />
      <input name="password" type="password" placeholder="Password" className="w-full rounded border border-white/20 bg-card p-2" required />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button className="w-full rounded bg-accent p-2 font-medium">Sign in</button>
    </form>
  );
}
