import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="container-page flex max-w-md py-16">
      <div className="w-full space-y-4 rounded-xl border border-white/10 bg-card p-6">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <RegisterForm />
        <p className="text-sm text-white/70">Already have one? <Link href="/auth/login" className="text-accent">Sign in</Link></p>
      </div>
    </div>
  );
}
