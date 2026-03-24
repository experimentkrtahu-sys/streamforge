import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="container-page flex max-w-md py-16">
      <div className="w-full space-y-4 rounded-xl border border-white/10 bg-card p-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <LoginForm />
        <p className="text-sm text-white/70">No account? <Link href="/auth/register" className="text-accent">Register</Link></p>
      </div>
    </div>
  );
}
